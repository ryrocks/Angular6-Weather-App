import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  forecastData: any[];
  forecastDailyData: any[];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.forecastData.subscribe(data => this.forecastData = data);
    this._dataService.forecastDailyData.subscribe(data => this.forecastDailyData = data);
  }

}
