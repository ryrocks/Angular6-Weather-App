import { Component, OnInit, Input } from '@angular/core';
import { OpenWeatherBase } from '../../const/open-weather.enum';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {
  @Input('weatherItem') weather: any;
  @Input('isDaily') isDaily: boolean;

  iconUrl: string = '';
  units: boolean;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.unitData.subscribe(data => this.units = data);
    

    if (this.weather) {
      this.iconUrl = OpenWeatherBase.baseIconUrl + this.weather.icon + '.png';
    }
  }
}
