import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private isLandscapeSource = new BehaviorSubject(false);
  private citySource = new BehaviorSubject('');

  isLandScapeData = this.isLandscapeSource.asObservable();
  cityData = this.citySource.asObservable();

  constructor() { }

  setIsLandscapeData(data: boolean) {
    // console.log('setWeatherData:::', data);
    this.isLandscapeSource.next(data);
  }

  setCityData(data: string) {
    this.citySource.next(data);
  }
  
}
