import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherNowadaysComponent } from './weather-nowadays.component';

describe('WeatherNowadaysComponent', () => {
  let component: WeatherNowadaysComponent;
  let fixture: ComponentFixture<WeatherNowadaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherNowadaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherNowadaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
