import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { OpenWeatherBase } from '../../const/open-weather.enum';


@Component({
  selector: 'app-weather-nowadays',
  templateUrl: './weather-nowadays.component.html',
  styleUrls: ['./weather-nowadays.component.scss']
})
export class WeatherNowadaysComponent implements OnInit {

  weather: any;
  iconUrl: string = '';
  units: boolean;

  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this._dataService.weatherData.subscribe(data => {
      this.weather = data;

      if (this.weather.weather) {
        this.iconUrl = OpenWeatherBase.baseIconUrl + this.weather.weather[0].icon + '.png';
      }
    });

    this._dataService.unitData.subscribe(data => {
      this.units = data;
    });

  }

}
