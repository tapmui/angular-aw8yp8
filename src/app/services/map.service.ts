import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import FullScreen from 'ol/control/FullScreen';
import Attribution from 'ol/control/Attribution';
import OsmSource from 'ol/source/OSM';
import StamenSource from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import DragAndDrop from 'ol/interaction/DragAndDrop';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import {
  OverviewMap,
  defaults as defaultControls,
  ScaleLine,
} from 'ol/control';
import { defaults as defaultInteractions, PinchZoom } from 'ol/interaction';
import { Injectable } from '@angular/core';
import { Collection, Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { Vector } from '../models/vector';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  tileSources = [
    { name: 'None', source: null },
    { name: 'OSM', source: new OsmSource() },
    { name: 'Stamen', source: new StamenSource({ layer: 'toner' }) },
  ];

  selectedTileSource = this.tileSources[1];
  vectorSources: Vector[] = [];

  overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: this.selectedTileSource.source,
      }),
    ],
  });

  attribution = new Attribution({
    collapsible: false,
  });

  zoom = 13;
  maxZoom = 22;
  minZoom = 13;
  // Tampere 61.49911 23.78712Pa
  position = fromLonLat([23.78712, 61.49911]);

  private readonly map: Map;
  private readonly tileLayer: TileLayer<OsmSource> = new TileLayer();
  private readonly vectorLayer: VectorLayer<any> = new VectorLayer<any>();
  private readonly extent = [
    813079.7791264898, 5929220.284081122, 848966.9639063801, 5936863.986909639,
  ];
  constructor() {
    this.map = new Map({
      // interactions: defaultInteractions().extend([new PinchZoom()]),
      layers: [this.tileLayer, this.vectorLayer],
      view: new View({
        constrainResolution: true,
        center: this.position,
        zoom: this.zoom,
        //minZoom: this.minZoom,
        maxZoom: this.maxZoom,
      }),
      controls: defaultControls({
        attribution: false,
        zoom: false,
      }).extend([this.attribution]),
      //controls: defaultControls().extend([this.overviewMapControl]),
      // controls: defaultControls().extend([
      //   // new Attribution(),
      //   new ZoomToExtent({ extent: this.extent }),
      //   new FullScreen(),
      // ]),
    });

    const dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [GeoJSON],
    });

    dragAndDropInteraction.on('addfeatures', (event) => {
      const features = (event.features ?? []) as
        | Feature<Geometry>[]
        | Collection<Feature<Geometry>>
        | undefined;
      const vectorSource = new VectorSource({ features });
      const vector: Vector = { name: event.file.name, source: vectorSource };

      this.vectorSources.push(vector);
      this.setVectorSource(vector);
    });

    this.map.addInteraction(dragAndDropInteraction);
  }

  createMap(elementId: string): void {
    this.map.setTarget(elementId);
    this.addMapControls();
    this.map.updateSize();
  }

  addMapControls() {
    this.map.addControl(
      new ScaleLine({
        bar: true,
        minWidth: 140,
        steps: 4,
        units: 'metric',
        text: true,
      })
    );
    this.map.addControl(
      new ZoomToExtent({ extent: this.extent })
    );
  }

  /**
   * Updates zoom and center of the view.
   * @param zoom Zoom.
   * @param center Center in long/lat.
   */
  updateView(zoom = 2, center: [number, number] = [0, 0]): void {
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(fromLonLat(center));
  }

  /**
   * Updates target and size of the map.
   * @param target HTML container.
   */
  updateSize(target = 'map'): void {
    this.map.setTarget(target);
    this.map.updateSize();
  }

  /**
   * Sets the source of the tile layer.
   * @param source Source.
   */
  setTileSource(source = this.selectedTileSource): void {
    this.selectedTileSource = source;
    this.tileLayer.setSource(source.source);
  }

  /**
   * Sets the source of the vector layer.
   * @param source Source.
   */
  setVectorSource(source: Vector): void {
    this.vectorLayer.setSource(source.source);
    this.map.getView().fit(this.vectorLayer.getSource().getExtent());
  }
}
