import { Component } from '@angular/core';
import { Coordinates } from '../user-card/user-card';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  coordinates: Coordinates = {
    latitude: '0',
    longitude: '0'
  }

  getWeather(coordinates: Coordinates) {
    this.coordinates = coordinates
  }
}
