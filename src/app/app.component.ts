import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DataService } from './service/data.service';
import { GeneralService } from './service/general.service';

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
  isLandscape: boolean = false;

  constructor(
    private _dataService: DataService,

    private _generalService: GeneralService,

    private renderer: Renderer2,

    private el: ElementRef
  ) {

  }

  ngOnInit() {
    this.getLocation();

    // event binding
    this.renderer.listen('window', 'orientationchange', () => this.onOrientationChange());

    // get first detection for isLandscape
    this.onOrientationChange();

    // set isLandscape
    this._generalService.isLandScapeData.subscribe(data => this.isLandscape = data);
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

  onOrientationChange() {
    switch (window.orientation) {
      case -90:
        this._generalService.setIsLandscapeData(true);
        break;
      case 90:
        this._generalService.setIsLandscapeData(true);
        break;
      default:
        this._generalService.setIsLandscapeData(false);
    }
  }
}
