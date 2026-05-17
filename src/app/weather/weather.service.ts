import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './weather';
import { Coordinates } from '../user-card/user-card';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = environment.weatherAPIUrl
  private defaultParams = '?&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&current_weather=true&hourly=temperature_2m'

  constructor(private http: HttpClient) {}

  getWeather(coordinates: Coordinates): Observable<Weather> {
    const coordinatesToParams = new URLSearchParams({...coordinates}).toString()
    return this.http.get<Weather>(`${this.url}${this.defaultParams}&${coordinatesToParams}`)
  }
}
