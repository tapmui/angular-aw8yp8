import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ControlsComponent } from './components/controls/controls.component';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [ControlsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false },
    },
  ],
})
export class AppModule {}
