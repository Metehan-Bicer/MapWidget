import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetInfoModalComponent } from './widget-info-modal.component';

describe('WidgetInfoModalComponent', () => {
  let component: WidgetInfoModalComponent;
  let fixture: ComponentFixture<WidgetInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
