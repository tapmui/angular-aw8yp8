import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  observer = new ResizeObserver(() => {
    this.mapService.updateSize(this.mapContainer.nativeElement.id);
  });

  constructor(private mapService: MapService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.mapService.createMap(this.mapContainer.nativeElement.id);
    // this follows map size changes and updates view when needed.
    this.observer.observe(this.mapContainer.nativeElement);
    this.mapService.updateView();
    this.mapService.setTileSource();
    this.mapService.updateSize(this.mapContainer.nativeElement.id);
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.mapContainer.nativeElement);
    this.observer.disconnect();
  }
}
