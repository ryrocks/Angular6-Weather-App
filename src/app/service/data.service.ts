import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private weatherSource = new BehaviorSubject({});
  private forecastSource = new BehaviorSubject([]);

  weatherData = this.weatherSource.asObservable();
  forecastData = this.forecastSource.asObservable();

  constructor() { }

  getWeatherData(data: any) {
    console.log('data:::',data);
    this.weatherSource.next(data);
  }

  getForecastData(data: any) {
    console.log('data:::',data);
    this.forecastSource.next(data);
  }

}
