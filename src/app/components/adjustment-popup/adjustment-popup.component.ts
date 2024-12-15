import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adjustment-popup',
  templateUrl: './adjustment-popup.component.html',
  styleUrls: ['./adjustment-popup.component.scss']
})
export class AdjustmentPopupComponent {
  @Input() widget: any;
  @Input() type!: 'temperature' | 'humidity';
  @Output() onSave = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();

  get currentValue(): number {
    return this.type === 'temperature' ? this.widget.temperature : this.widget.humidity;
  }

  get title(): string {
    return this.type === 'temperature' ? 'Sıcaklık' : 'Nem';
  }

  get unit(): string {
    return this.type === 'temperature' ? '°C' : '%';
  }

  handleSave(value: string) {
    const numValue = Number(value);
    if (!isNaN(numValue)) {
      this.onSave.emit(numValue);
    }
  }

  handleCancel() {
    this.onCancel.emit();
  }
} 