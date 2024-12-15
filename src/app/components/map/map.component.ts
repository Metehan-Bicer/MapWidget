// map.component.ts
import { Component, OnInit, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import * as L from 'leaflet';
import { WidgetPopupComponent } from '../widget-popup/widget-popup.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markers: any[] = [];
  public widgets: any[] = [];
  public filteredWidgets: any[] = [];
  public searchTerm: string = '';
  public selectedWidgetId: string | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.loadPinsAndWidgets();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.925533, 32.866287],
      zoom: 6,
      zoomControl: true,
      attributionControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  private loadPinsAndWidgets(): void {
    const turkeyBounds = {
      minLat: 36.0,
      maxLat: 42.0,
      minLng: 26.0,
      maxLng: 45.0
    };

    this.widgets = Array.from({ length: 8 }, (_, i) => {
      const lat = Math.random() * (turkeyBounds.maxLat - turkeyBounds.minLat) + turkeyBounds.minLat;
      const lng = Math.random() * (turkeyBounds.maxLng - turkeyBounds.minLng) + turkeyBounds.minLng;
      
      return {
        id: i + 1,
        lat: parseFloat(lat.toFixed(4)),
        lng: parseFloat(lng.toFixed(4)),
        name: `${i === 0 ? '1 nolu kapı' : i === 1 ? 'Salon' : i === 2 ? 'Çalışma Odası' : 
               i === 3 ? 'Yatak Odası' : i === 4 ? 'Mutfak' : `Oda ${i + 1}`}`,
        temperature: Math.floor(Math.random() * (35 - 15) + 15),
        humidity: Math.floor(Math.random() * (80 - 40) + 40),
        lastUpdate: this.getRandomDate(),
        status: Math.random() > 0.5 ? 'online' : 'offline'
      };
    });

    this.filteredWidgets = [...this.widgets];

    this.widgets.forEach(widget => {
      const marker = L.marker([widget.lat, widget.lng]).addTo(this.map);
      marker.on('click', () => this.onPinClick(widget));
      this.markers.push({ marker, widget });
    });
  }

  private getRandomDate(): Date {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return new Date(yesterday.getTime() + Math.random() * (now.getTime() - yesterday.getTime()));
  }

  private onPinClick(widget: any): void {
    const popup = L.popup({
      className: 'custom-popup',
      maxWidth: 300,
      minWidth: 250,
    })
      .setLatLng([widget.lat, widget.lng])
      .setContent(this.createPopupContent(widget));

    popup.openOn(this.map);
  }

  private createPopupContent(widget: any): HTMLElement {
    const container = document.createElement('div');
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(WidgetPopupComponent)
      .create(this.injector);

    componentRef.instance.widget = widget;
    componentRef.instance.onTempChange.subscribe((value: number) => {
      widget.temperature = value;
      widget.lastUpdate = new Date();
      this.map.closePopup();
    });
    componentRef.instance.onHumidityChange.subscribe((value: number) => {
      widget.humidity = value;
      widget.lastUpdate = new Date();
      this.map.closePopup();
    });

    this.applicationRef.attachView(componentRef.hostView);
    container.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    return container;
  }

  public searchWidgets(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.filteredWidgets = this.widgets.filter(widget => {
      return widget.name.toLowerCase().includes(this.searchTerm) ||
             widget.temperature.toString().includes(this.searchTerm) ||
             widget.humidity.toString().includes(this.searchTerm) ||
             `${widget.temperature}°C`.includes(this.searchTerm) ||
             `${widget.humidity}%`.includes(this.searchTerm) ||
             `%${widget.humidity}`.includes(this.searchTerm);
    });
  }

  onPinSelect(widgetId: string) {
    this.selectedWidgetId = widgetId;
  }
}