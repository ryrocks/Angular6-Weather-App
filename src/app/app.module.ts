import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { WeatherNowadaysComponent } from './components/weather-nowadays/weather-nowadays.component';

import { HttpService } from './service/http.service';
import { DataService } from './service/data.service';
import { GeneralService } from './service/general.service';

@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    WeatherForecastComponent,
    WeatherItemComponent,
    WeatherNowadaysComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    DataService,
    GeneralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
