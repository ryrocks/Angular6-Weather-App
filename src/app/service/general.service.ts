import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private isLandscapeSource = new BehaviorSubject(false);

  isLandScapeData = this.isLandscapeSource.asObservable();

  constructor() { }

  setIsLandscapeData(data: boolean) {
    // console.log('setWeatherData:::', data);
    this.isLandscapeSource.next(data);
  }
}
