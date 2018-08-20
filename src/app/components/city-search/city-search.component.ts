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
  city: string = '';
  units: string = 'Metric';

  constructor(
    private _httpClient: HttpService,

    private _dataService: DataService
  ) {

  }

  ngOnInit() {

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

    if (latitude && longitude) {
      this._httpClient.getWeatherByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.getWeatherData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecastByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.getForecastData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecastDailyByCoordinates(latitude, longitude, this.units)
        .subscribe(
          res => {
            this._dataService.getForecastDailyData(res);
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
            this._dataService.getWeatherData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecast(city, this.units)
        .subscribe(
          res => {
            this._dataService.getForecastData(res);
          },
          error => console.log(error)
        );

      this._httpClient.getForecastDaily(city, this.units)
        .subscribe(
          res => {
            this._dataService.getForecastDailyData(res);
          },
          error => console.log(error)
        );
    }



  }
}
