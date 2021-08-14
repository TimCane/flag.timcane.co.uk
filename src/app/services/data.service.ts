import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config, Observable } from 'rxjs';
import { Config } from '../models/config';
import { map } from 'rxjs/operators';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  load(): Observable<Config> {
    return this.http
      .get<Config>("/assets/data.json")
      .pipe(
        map(this.transform)
      );
  }

  private transform(config: Config): Config {
    let continentCountries: { [key: string]: Country[]; } = {};

    config.countries.forEach(country => {
      country.continents.forEach(continent => {
        continentCountries[continent] ? continentCountries[continent].push(country) : continentCountries[continent] = [country]
      })
    });

    for (const continent of config.continents) {
      continent.countries = continentCountries[continent.id];
    }

    return config;
  } 
}
