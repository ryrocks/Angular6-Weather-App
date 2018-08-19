import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  forecastData: any[];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    // this._dataService.weatherData.subscribe(data => console.log(data));
    this._dataService.forecastData.subscribe(data => this.forecastData = data);
  }

}
