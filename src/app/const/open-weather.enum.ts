export enum OpenWeatherBase {
    baseUrl = 'https://api.openweathermap.org/data/2.5/',
    baseIconUrl = 'https://openweathermap.org/img/w/',
    appId = '73c3b3362fd0358337f285139e4fdab9'
}


export enum APIType {
    weather = 'weather?q=',
    forecast = 'forecast?q=',
    forecastDaily = 'forecast/daily?q='
}

// Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
export class Units {
    Kelvin: 'Default';
    Celsius: 'Metric';
    Fahrenheit: 'Imperial';
}