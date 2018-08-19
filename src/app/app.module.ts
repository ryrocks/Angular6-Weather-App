import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';

import { HttpService } from './service/http.service';

@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
