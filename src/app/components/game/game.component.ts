import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Country } from 'src/app/models/country';
import { DataStore } from 'src/app/stores/data.store';
import { SettingsStore } from 'src/app/stores/settings.store';

@Component({
  selector: 'flag-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  elapsedTime: number;

  currentCountryCode: string;
  identifiedCountryCodes: string[];

  get totalTime(): number {
    return (this.settings.duration * 60);
  }

  get remainingTime(): number {
    return this.totalTime - this.elapsedTime;
  }

  get currentCountry$() {
    return this.remainingCountries$
      .pipe(
        map(
          x => x.filter(
            c => c.code == this.currentCountryCode
          )[0]
        )
      );
  }

  get remainingCountries$() {
    return this.countries$
      .pipe(
        map(
          x => x.filter(
            c => !this.identifiedCountryCodes.includes(c.code)
          )
        )
      )
  }

  get countries$() {
    return this.data.countries$
      .pipe(
        map(
          x => x.filter(
            y => this.settings.selectedContinents.some(z => y.continents.includes(z))
          )
        )
      )
  }

  constructor(private data: DataStore, private settings: SettingsStore) {
    this.elapsedTime = 0;
    this.currentCountryCode = "";
    this.identifiedCountryCodes = [];
  }

  ngOnInit(): void {
    this.start();
  }

  start() {

    this.remainingCountries$.pipe(map(x => x[0]))
      .subscribe(
        (country: Country) => {
          this.currentCountryCode = country.code
        }
      )

    window.setInterval(() => this.gameTick(), 1000);
  }

  gameTick() {
    if (this.elapsedTime < this.totalTime) {
      this.elapsedTime++;
    }
  }
}
