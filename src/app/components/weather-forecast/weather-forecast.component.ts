import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { GeneralService } from '../../service/general.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  isShowChat: boolean;
  city: string = '';
  forecastData: any[];
  forecastDailyData: any[];

  // chart config
  // view: any[] = [700, 400];
  view: any[];

  // optional chart config
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature';

  colorScheme = {
    domain: ['#0F2540']
  };

  // line, area
  autoScale = true;


  constructor(
    private _dataService: DataService,

    private _generalService: GeneralService

  ) {

  }

  ngOnInit() {
    this._generalService.cityData.subscribe(city => this.city = city);

    this._generalService.isLandScapeData.subscribe(isLandscape => {
      // window.innerHeight and innerWidth are not updated immediately
      setTimeout(() => {
        // value should be adjusted
        if (isLandscape && window.innerHeight >= 768) {
          this.isShowChat = true;
        } else if (window.innerHeight >= 1190 && window.innerWidth >= 768) {
          this.isShowChat = true;
        } else {
          this.isShowChat = false;
        }
      }, 1);

    });

    this._dataService.forecastData.subscribe(data => this.formatData(data, 1));

    this._dataService.forecastDailyData.subscribe(data => this.formatData(data, 2));
  }

  onSelect(event) {
    console.log(event);
  }

  formatData(data: any[], type: number) {
    // forecastData = 1
    // forcastDailyData = 2
    if (type === 1) {
      let array = data.map(s => {
        let dt_txt = this.timeConverter(s.dt_txt.split(' ')[1].substring(0, 2));
        return {
          "name": dt_txt,
          "icon": s.weather[0].icon,
          "value": Math.round(s.main.temp)
        };
      });
      this.forecastData = [
        {
          "name": this.city,
          "series": array
        }
      ];
    } else {
      let array = data.map(s => {
        let week_txt = new Date(s.dt * 1000).toString().substring(0, 3);
        return {
          "name": week_txt,
          "icon": s.weather[0].icon,
          "value": Math.round(s.temp.day)
        };
      });
      this.forecastDailyData = [
        {
          "name": this.city,
          "series": array
        }
      ];
    }
  }

  timeConverter(time) {
    let hour = Number(time);
    hour = hour % 12 || 12;
    let ampm = (hour < 12 || hour === 24) ? "AM" : "PM";
    return hour + ampm;
  }

}
