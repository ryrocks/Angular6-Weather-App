import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { OpenWeatherBase, APIType } from '../const/open-weather.enum';


// OpenWeatherMap APP KEY: 73c3b3362fd0358337f285139e4fdab9
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {

  }

  /**
   * 
   * @param city - city name
   * @param units - units
   */
  getWeather(city: string, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.weather + city +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(_ => this.log(`getCurrentWeather city=${city}`)),
      catchError(this.errorHandler)
    )
  }

  getForecast(city: string, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.forecast + city +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(_ => this.log(`getForecast city=${city}`)),
      map(res => res['list']),
      catchError(this.errorHandler)
    )
  }

  getForecastDaily(city: string, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.forecastDaily + city +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(_ => this.log(`getForecast city=${city}`)),
      map(res => res['list']),
      catchError(this.errorHandler)
    )
  }

  /**
   * 
   * @param lat - latitude 
   * @param lon - longitude
   * @param units - units
   */
  getWeatherByCoordinates(lat: number, lon: number, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.weather +
      '&lat=' + lat +
      '&lon=' + lon +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(_ => this.log(`getWeatherByCoordinates lat=${lat}, lon=${lon}`)),
      catchError(this.errorHandler)
    )
  }

  getForecastByCoordinates(lat: number, lon: number, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.forecast +
      '&lat=' + lat +
      '&lon=' + lon +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(_ => this.log(`getForecastByCoordinates lat=${lat}, lon=${lon}`)),
      map(res => res['list']),
      catchError(this.errorHandler)
    )
  }

  getForecastDailyByCoordinates(lat: number, lon: number, units: string): Observable<any> {
    return this.http.get(
      OpenWeatherBase.baseUrl + APIType.forecastDaily +
      '&lat=' + lat +
      '&lon=' + lon +
      '&appid=' + OpenWeatherBase.appId +
      '&units=' + units
    ).pipe(
      tap(_ => this.log(`getForecastDailyByCoordinates lat=${lat}, lon=${lon}`)),
      map(res => res['list']),
      catchError(this.errorHandler)
    )
  }


  private log(message: string) {
    console.log(message);
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server Error');
  }


}
