export enum OpenWeatherBase {
    baseUrl = 'http://api.openweathermap.org/data/2.5/',
    baseIconUrl = 'http://openweathermap.org/img/w/',
    appId = '73c3b3362fd0358337f285139e4fdab9'
}


export enum APIType {
    weather = 'weather?q=',
    forecast = 'forecast?q='
}

// Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
export class Units {
    Kelvin: 'Default';
    Celsius: 'Metric';
    Fahrenheit: 'Imperial';
}