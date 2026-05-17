import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { WeatherService } from './weather.service';
import { Weather } from './weather';
import { 
  faSun,
  faSmog,
  faCloudSunRain,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faCloudShowersHeavy,
  faCloudBolt,
  faCloudMeatball
 } from '@fortawesome/free-solid-svg-icons';
 import { DEFAULT_REQUEST_DELAY } from './weather.constants'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnChanges, OnDestroy {
  @Input() user: UserCard = {
    location: {
      coordinates: {
        latitude: '0',
        longitude: '0'
      }
    }
  }
  private intervalId: ReturnType<typeof setTimeout> | undefined
  hideWeather = true
  weather:Weather = {
    current_weather: {
      temperature: 0,
      weathercode: 0,
    },
    daily: {
      temperature_2m_max: [],
      temperature_2m_min: []
    }
  }

  constructor (
    private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.intervalId) clearInterval(this.intervalId)
    if (!changes['user'].firstChange) {
      this.hideWeather = false
      this.getWeather(changes)
      this.intervalId = setInterval(() => {
        this.getWeather(changes)
      }, DEFAULT_REQUEST_DELAY)
    }
  }

  ngOnDestroy () {
    clearInterval(this.intervalId)
  }

  getWeather (changes: SimpleChanges) {
    this.weatherService.getWeather(changes['user'].currentValue.location.coordinates).subscribe((newWeather) => {
      this.weather = newWeather
    })
  }

  getWeatherIcon (weatherCode: number) {
    switch (weatherCode) {
      case 0:
      default: {
        return faSun
      }
      case 1:
      case 2:
      case 3: {
        return faCloudSun
      }
      case 45:
      case 48: {
        return faSmog
      }
      case 51:
      case 53:
      case 55:
      case 56:
      case 57: {
        return faCloudSunRain
      }
      case 61:
      case 63:
      case 65:
      case 66:
      case 67: {
        return faCloudRain
      }
      case 71:
      case 73:
      case 75:
      case 77: {
        return faSnowflake
      }
      case 81:
      case 82:
      case 83: {
        return faCloudShowersHeavy
      }
      case 85:
      case 86: {
        return faCloudMeatball
      }
      case 95:
      case 96:
      case 99: {
        return faCloudBolt
      }
    }
  }
}
