import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { DataService } from '../../service/data.service';
import { GeneralService } from '../../service/general.service';

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
  errorMsg: string = '';


  constructor(
    private _httpClient: HttpService,

    private _dataService: DataService,

    private _generalService: GeneralService
  ) {

  }

  ngOnInit() {
    this._dataService.unitData.subscribe(units => {
      this.units = units ? 'Imperial' : 'Metric';
      this.onSubmit();
    });

    this._generalService.cityData.subscribe(city => {
      this.city = city;
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

      this._httpClient.getWeatherByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._generalService.setCityData(res.name);
            this.city = res.name;
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

      this._generalService.setCityData(city);

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
