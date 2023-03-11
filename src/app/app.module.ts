import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ControlsComponent } from './components/controls/controls.component';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { GeoService } from './services/geo.service';
import { AppService } from './services/app.service';

@NgModule({
  declarations: [AppComponent, ControlsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [
    AppService,
    GeoService,
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
