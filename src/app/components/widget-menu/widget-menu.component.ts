// widget-menu.component.ts
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetInfoModalComponent } from '../widget-info-modal/widget-info-modal.component';

@Component({
  selector: 'app-widget-menu',
  templateUrl: './widget-menu.component.html',
  styleUrls: ['./widget-menu.component.scss']
})
export class WidgetMenuComponent {
  constructor(private modalService: NgbModal) {}

  @Input() widgets: any[] = [];
  onInfo(widget: any): void {
    const modalRef = this.modalService.open(WidgetInfoModalComponent);
    modalRef.componentInstance.widget = widget;
  }
}