import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-map';
  latitude: number;
  longitude: number;
  units: boolean = false;

  constructor(
    private _dataService: DataService
  ) {

  }

  ngOnInit() {
    this.getLocation();
  }

  changeUnit() {
    this.units = !this.units;
    this._dataService.setUnitData(this.units);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        res => {
          this.latitude = res.coords.latitude;
          this.longitude = res.coords.longitude;
        },
        error => console.log(error)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
}
