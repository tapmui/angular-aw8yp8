import { AfterViewInit, Component } from '@angular/core';
import { MapService } from './services/map.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ControlsComponent } from './components/controls/controls.component';
import { Subscription } from 'rxjs';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isControlsOpened = false;

  private readonly controlsStateSubscription: Subscription;

  constructor(
    private appService: AppService,
    private bottomSheet: MatBottomSheet
  ) {
    this.controlsStateSubscription = this.appService.controlsState.subscribe(
      (value) => (this.isControlsOpened = value)
    );
  }

  ngAfterViewInit(): void {
  }

  openControls(): void {
    this.bottomSheet.open(ControlsComponent, { autoFocus: false });
  }
}
