import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { WidgetMenuComponent } from './components/widget-menu/widget-menu.component';
import { WidgetPopupComponent } from './components/widget-popup/widget-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    WidgetMenuComponent,
    WidgetPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
