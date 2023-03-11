import { AfterViewInit, Component } from '@angular/core';
import { GeoService } from './services/geo.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ControlsComponent } from './components/controls/controls.component';
import { Subscription } from 'rxjs';
import { AppService } from './services/app.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { AppModule } from './app.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    AppModule,
  ],
  providers: [
    AppService,
    GeoService,
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false },
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isControlsOpened = false;

  private readonly controlsStateSubscription: Subscription;

  constructor(
    private appService: AppService,
    private geoService: GeoService,
    private bottomSheet: MatBottomSheet
  ) {
    this.controlsStateSubscription = this.appService.controlsState.subscribe(
      (value) => (this.isControlsOpened = value)
    );
  }

  ngAfterViewInit(): void {
    this.geoService.updateView();
    this.geoService.setTileSource();
    this.geoService.updateSize();
  }

  openControls(): void {
    this.bottomSheet.open(ControlsComponent, { autoFocus: false });
  }
}
