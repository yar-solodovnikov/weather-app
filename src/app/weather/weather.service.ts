import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './weather';
import { Coordinates } from '../user-card/user-card';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = 'https://api.open-meteo.com/v1/forecast?&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&current_weather=true'

  constructor(private http: HttpClient) {}

  getWeather(coordinates: Coordinates): Observable<Weather> {
    const coordinatesToParams = new URLSearchParams({...coordinates}).toString()
    return this.http.get<Weather>(`${this.url}&${coordinatesToParams}`)
  }
}
