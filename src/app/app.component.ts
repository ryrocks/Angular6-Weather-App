import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-map';
  latitude: number;
  longitude: number;

  ngOnInit() {
    this.getLocation();
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
