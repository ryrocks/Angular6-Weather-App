import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { OpenWeatherBase, APIType } from '../const/open-weather.enum';


// OpenWeatherMap APP KEY: 73c3b3362fd0358337f285139e4fdab9
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  getCurrentWeather(city: string, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.weather + city +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(res => res),
      catchError(this.handleError('getCurrentWeather', []))
    )
  }

  getForecast(city:string, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.forecast + city +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(res => res),
      catchError(this.handleError('getForecast', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }


}
