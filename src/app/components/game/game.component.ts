import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  currentIndex: number;

  get previousIndex() {
    if (this.currentIndex == 0) {
      return this.remainingCountries.length - 1;
    } else {
      return this.currentIndex - 1;
    }
  }

  get nextIndex() {
    if (this.currentIndex == this.remainingCountries.length - 1) {
      return 0;
    } else {
      return this.currentIndex + 1;
    }
  }

  identifiedCountryCodes: string[];

  get score(){
    return this.identifiedCountryCodes.length;
  }

  guess: string;

  get totalTime(): number {
    return (this.settings.duration * 60);
  }

  get remainingTime(): number {
    return this.totalTime - this.elapsedTime;
  }

  get currentCountry() {
    return this.remainingCountries[this.currentIndex];
  }

  get previousCountry() {
    return this.remainingCountries[this.previousIndex];
  }

  get nextCountry() {
    return this.remainingCountries[this.nextIndex];
  }

  get remainingCountries() {
    return this.countries
      .filter(
        c => !this.identifiedCountryCodes.includes(c.code)
      );
  }

  get countries() {
    return this.data.countries
      .filter(
        country => this.settings.selectedContinents.some(z => country.continents.includes(z))
      )
  }

  get totalCountries(){
    return this.countries.length;
  }

  get typeAhead(): string {
    if (this.settings.typeAhead && this.guess.length >= 3) {
      let list: Country[];
      if (this.settings.typeAheadFiltered) {
        list = this.remainingCountries;
      } else {
        list = this.countries;
      }

      let country = list.filter(
        c => c.name.toLowerCase().startsWith(this.guess.toLowerCase())
      )[0];

      if (country) {
        return this.guess + country.name.substring(this.guess.length, country.name.length);
      }
    }

    return "";
  }

  constructor(private data: DataStore, private settings: SettingsStore) {
    this.elapsedTime = 0;
    this.currentIndex = 0;
    this.identifiedCountryCodes = [];
    this.guess = "";
  }

  ngOnInit(): void {
    this.start();
  }

  start() {
    if (this.settings.randomise) {
      this.randomise();
    }

    window.setInterval(() => this.gameTick(), 1000);
  }

  randomise() {
    var m = this.data.countries.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.data.countries[m];
      this.data.countries[m] = this.data.countries[i];
      this.data.countries[i] = t;
    }
  }

  gameTick() {
    if (this.elapsedTime < this.totalTime) {
      this.elapsedTime++;
    }
  }

  preventDefaults(event: KeyboardEvent) {
    if (["ArrowRight", "ArrowLeft", "Tab"].includes(event.key)) {
      event.preventDefault();
    }
  }

  onGuess() {
    this.checkGuess();
  }

  onTab() {
    if (this.settings.tabCompletion) {
      this.guess = this.typeAhead;

      this.checkGuess();
    }
  }

  onPrev() {
    console.log("prev");
    this.currentIndex = this.previousIndex;
  }

  onNext() {
    console.log("next");
    this.currentIndex = this.nextIndex;
  }

  checkGuess() {
    let guess = this.guess.toLowerCase();
    let countryName = this.currentCountry.name.toLowerCase();
    let countryAkas = this.currentCountry.aka.map(aka => aka.toLowerCase());

    if (guess == countryName || countryAkas.includes(guess)) {
      this.identifiedCountryCodes.push(this.currentCountry.code);
      this.guess = "";
    }
  }
}
