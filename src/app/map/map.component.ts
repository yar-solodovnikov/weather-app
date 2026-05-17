import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { UserCard } from '../user-card/user-card';
import { 
  DEFAULT_ICON_HEIGHT,
  DEFAULT_MARKER_IMAGE,
  DEFAULT_MARKER_HEIGHT,
  DEFAULT_ANCHOR_X,
  DEFAULT_ANCHOR_Y,
  DEFAULT_ICON_WIDTH,
  DEFAULT_MAP_LAYER,
  DEFAULT_MAX_ZOOM,
  DEFAULT_MIN_ZOOM,
  DEFAULT_ZOOM
} from './map.constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() user: UserCard = {
    location: {
      coordinates: {
        latitude: '0',
        longitude: '0'
      }
    }
  }
  private map!: L.Map;
  private marker!: L.Marker<any>

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'].firstChange && !this.map) return
    this.user = changes['user'].currentValue
    this.updateMap()
  }

  updateMap() {
    if (this.marker) {
      this.marker.remove()
    }
    let iconUrl = DEFAULT_MARKER_IMAGE
    let iconHeight = DEFAULT_MARKER_HEIGHT
    if (this.user.picture?.thumbnail) {
      iconUrl = this.user.picture?.thumbnail
      iconHeight = DEFAULT_ICON_HEIGHT
    }
    const iconDefault = L.icon({
      iconUrl,
      iconSize: [DEFAULT_ICON_WIDTH, iconHeight],
      iconAnchor: [DEFAULT_ANCHOR_X, DEFAULT_ANCHOR_Y]
    });
    L.Marker.prototype.options.icon = iconDefault
    this.map.panTo(new L.LatLng(Number(this.user.location?.coordinates.latitude), Number(this.user.location?.coordinates.longitude)))
    this.addMarker()
    this.map.invalidateSize()
  }

  addMarker () {
    this.marker = L.marker([Number(this.user.location?.coordinates.latitude), Number(this.user.location?.coordinates.longitude)])
    this.marker.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [Number(this.user.location?.coordinates.latitude), Number(this.user.location?.coordinates.longitude)],
      zoom: DEFAULT_ZOOM
    });
    this.map.locate()
    const tiles = L.tileLayer(DEFAULT_MAP_LAYER, {
      maxZoom: DEFAULT_MAX_ZOOM,
      minZoom: DEFAULT_MIN_ZOOM
    })
    tiles.addTo(this.map);
    this.updateMap()
  }
}
