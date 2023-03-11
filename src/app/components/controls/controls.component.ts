import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppService } from '../../services/app.service';
import { GeoService } from '../../services/geo.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent implements OnInit {
  constructor(
    private appService: AppService,
    public geoService: GeoService,
    private bottomSheetRef: MatBottomSheetRef<ControlsComponent>
  ) {}

  ngOnInit(): void {
    this.bottomSheetRef
      .afterOpened()
      .subscribe(() => this.appService.controlsState.next(true));
    this.bottomSheetRef
      .afterDismissed()
      .subscribe(() => this.appService.controlsState.next(false));
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }
}
