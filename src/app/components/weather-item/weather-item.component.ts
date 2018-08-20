import { Component, OnInit, Input } from '@angular/core';
import { OpenWeatherBase } from '../../const/open-weather.enum';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {
  @Input('weatherItem') weather: any;
  @Input('isDaily') isDaily: boolean;

  iconUrl: string = '';
  dt_txt: string;
  week_txt: string;

  constructor() { }

  ngOnInit() {
    this.iconUrl = OpenWeatherBase.baseIconUrl + this.weather.weather[0].icon + '.png';

    if (this.weather) {
      this.formatData();
    }
  }

  formatData() {
    if (!this.isDaily) {
      this.dt_txt = this.weather.dt_txt.split(' ')[1].substring(0, 2);
    } else {
      this.week_txt = new Date(this.weather.dt * 1000).toString().substring(0, 3);
    }
  }

}
