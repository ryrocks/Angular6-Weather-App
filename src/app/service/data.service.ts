import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private weatherSource = new BehaviorSubject({});
  private forecastSource = new BehaviorSubject([]);
  private forecastDailySource = new BehaviorSubject([]);
  private unitSource = new BehaviorSubject(false);

  weatherData = this.weatherSource.asObservable();
  forecastData = this.forecastSource.asObservable();
  forecastDailyData = this.forecastDailySource.asObservable();
  unitData = this.unitSource.asObservable();

  constructor() { }

  setWeatherData(data: any) {
    console.log('setWeatherData:::', data);
    this.weatherSource.next(data);
  }

  setForecastData(data: any) {
    console.log('setForecastData:::', data);
    this.forecastSource.next(data);
  }

  setForecastDailyData(data: any) {
    console.log('setForecastDailyData:::', data);
    this.forecastDailySource.next(data);
  }

  setUnitData(data: boolean) {
    console.log('setUnitData:::', data);
    this.unitSource.next(data);
  }

}
