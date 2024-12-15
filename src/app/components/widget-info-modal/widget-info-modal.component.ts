import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-widget-info-modal',
  templateUrl: './widget-info-modal.component.html',
  styleUrls: ['./widget-info-modal.component.scss']
})
export class WidgetInfoModalComponent {
  @Input() widget: any;

  constructor(public activeModal: NgbActiveModal) {}
}