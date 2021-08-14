import { Component, OnInit } from '@angular/core';
import { Config } from './models/config';
import { Continent } from './models/continent';
import { Country } from './models/country';
import { Settings } from './models/settings';
import { DataService } from './services/data.service';

@Component({
  selector: 'flag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading: number;

  countries: Country[];
  continents: Continent[];

  constructor(private data: DataService) {
    this.loading = 0;
    this.countries = [];
    this.continents = [];
  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.loading++;
    this.data.load()
      .subscribe(
        (config: Config) => {
          this.countries = config.countries;
          this.continents = config.continents;

          this.loading--;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  start(settings: Settings){
    console.log("hello")
    console.log(settings);
  }
}
