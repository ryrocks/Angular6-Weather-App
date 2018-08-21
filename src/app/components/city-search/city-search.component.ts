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
  errorMsg: string = '';


  constructor(
    private _httpClient: HttpService,

    private _dataService: DataService
  ) {

  }

  ngOnInit() {
    this._dataService.unitData.subscribe(units => {
      this.units = units ? 'Imperial' : 'Metric';
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
      this.onSubmit(latitude, longitude);
    } else {
      this.onSubmit();
    }
  }

  onSubmit(latitude?: number, longitude?: number) {
    this.errorMsg = '';

    if (latitude && longitude) {
      this.lastFlag = 'cor';
      this._httpClient.getWeatherByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.setWeatherData(res);
          },
          error => this.errorMsg = error.message
        );

      this._httpClient.getForecastByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastData(res);
          },
          error => this.errorMsg = error.message
        );

      this._httpClient.getForecastDailyByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastDailyData(res);
          },
          error => this.errorMsg = error.message
        );
    } else {
      let city = this.city === '' ? 'Taipei' : this.city;

      this.city = city;
      this.lastFlag = 'city';

      this._httpClient.getWeather(city, this.units)
        .subscribe(
          res => {
            this._dataService.setWeatherData(res);
          },
          error => this.errorMsg = error.message
        );

      this._httpClient.getForecast(city, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastData(res);
          },
          error => this.errorMsg = error.message
        );

      this._httpClient.getForecastDaily(city, this.units)
        .subscribe(
          res => {
            this._dataService.setForecastDailyData(res);
          },
          error => this.errorMsg = error.message
        );
    }



  }
}
