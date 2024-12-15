import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-widget-popup',
  templateUrl: './widget-popup.component.html',
  styleUrls: ['./widget-popup.component.scss']
})
export class WidgetPopupComponent {
  @Input() widget: any;
  @Input() isSelected: boolean = false;
  tempValue?: number;
  newTempValue?: number;
  humidityValue?: number;
  newHumidityValue?: number;
  showTemperatureInput: boolean = false;
  showHumidityInput: boolean = false;
  @Output() onTempChange = new EventEmitter<number>();
  @Output() onHumidityChange = new EventEmitter<number>();

  ngOnInit() {
    this.tempValue = this.widget.temperature;
    this.humidityValue = this.widget.humidity;
  }

  updateTemperature() {
    this.onTempChange.emit(this.newTempValue);
    this.showTemperatureInput = false;
  }

  updateHumidity() {
    this.onHumidityChange.emit(this.newHumidityValue);
    this.showHumidityInput = false;
  }

  toggleTemperatureInput() {
    this.showTemperatureInput = !this.showTemperatureInput;
    this.showHumidityInput = false;
  }

  toggleHumidityInput() {
    this.showHumidityInput = !this.showHumidityInput;
    this.showTemperatureInput = false;
  }
}