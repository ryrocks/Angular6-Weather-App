import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit, OnChanges {
  @Input() latitude: number;
  @Input() longitude: number;
  units: string = 'Metric';
  city: string = '';
  lastFlag: string = 'city';
  

  constructor(
    private _httpClient: HttpService,

    private _dataService: DataService
  ) {

  }

  ngOnInit() {
    this._dataService.unitData.subscribe(units => {
      this.units = units ? 'Imperial': 'Metric';
      if (this.lastFlag === 'city') {
        this.onSubmit();
      } else {
        this.onSubmit(this.latitude, this.longitude);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const latitude = changes.latitude.currentValue;
    const longitude = changes.longitude.currentValue;

    if (latitude && longitude) {
      this.lastFlag = 'cor';
      this.onSubmit(latitude, longitude);
    } else {
      this.lastFlag = 'city';
      this.onSubmit();
    }
  }

  onSubmit(latitude?: number, longitude?: number) {

    if (latitude && longitude) {
      this._httpClient.getWeatherByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.setWeatherData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecastByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecastDailyByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastDailyData(res);
          },
          error => console.log(error)
        );
    } else {
      let city = '';
      if (this.city === '') {
        city = 'Taipei';
      } else {
        city = this.city;
      }

      this._httpClient.getWeather(city, this.units)
        .subscribe(
          res => {
            this._dataService.setWeatherData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecast(city, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecastDaily(city, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastDailyData(res);
          },
          error => console.log(error)
        );
    }



  }
}
