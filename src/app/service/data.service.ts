import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private weatherSource = new BehaviorSubject({});
  private forecastSource = new BehaviorSubject([]);
  private forecastDailySource = new BehaviorSubject([]);

  weatherData = this.weatherSource.asObservable();
  forecastData = this.forecastSource.asObservable();
  forecastDailyData = this.forecastDailySource.asObservable();

  constructor() { }

  getWeatherData(data: any) {
    console.log('getWeatherData:::',data);
    this.weatherSource.next(data);
  }

  getForecastData(data: any) {
    console.log('getForecastData:::',data);
    this.forecastSource.next(data);
  }

  getForecastDailyData(data: any) {
    console.log('getForecastDailyData:::',data);
    this.forecastDailySource.next(data);
  }

}
