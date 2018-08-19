import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';

import { Units } from '../../const/open-weather.enum';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  city: string = '';
  units: string = 'Metric';

  constructor(private _httpClient: HttpService) {

  }

  ngOnInit() {
    this._httpClient.getCurrentWeather('Sydney', this.units)
    .subscribe(data => console.log(data));

    this._httpClient.getForecast('Sydney', this.units)
    .subscribe(data => console.log(data.list));
  }

}
