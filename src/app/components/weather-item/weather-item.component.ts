import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../../service/http.service'

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit, OnChanges {
  @Input('weatherItem') weather: any;
  iconUrl: string = '';

  constructor(private _httpClient: HttpService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.weatherItem) {
      this.getWeatherIcon();
    }
  }

  getWeatherIcon() {
    this._httpClient.getWeatherIcon(this.weather.weather[0].icon)
      .subscribe(
        res => {
          this.iconUrl = res;
        },
        error => console.log(error)
      );
  }

}
