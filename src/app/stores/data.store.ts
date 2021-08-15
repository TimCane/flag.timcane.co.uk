import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState } from '../enums/game-state.enum';
import { Config } from '../models/config';
import { Continent } from '../models/continent';
import { Country } from '../models/country';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class DataStore {

  //#region Country
  private readonly _countries: BehaviorSubject<Country[]>;
  readonly countries$: Observable<Country[]>;

  get countries(): Country[] {
    return this._countries.getValue();
  }

  private setCountries(val: Country[]) {
    this._countries.next(val);
  }
  //#endregion

  //#region Continents
  private readonly _continents: BehaviorSubject<Continent[]>;
  readonly continents$: Observable<Continent[]>;

  get continents(): Continent[] {
    return this._continents.getValue();
  }

  private setContinents(val: Continent[]) {
    this._continents.next(val);
  }
  //#endregion

    //#region GameState
    private readonly _gameState: BehaviorSubject<GameState>;
    readonly gameState$: Observable<GameState>;
  
    get gameState(): GameState {
      return this._gameState.getValue();
    }
  
    set gameState(val: GameState) {
      this._gameState.next(val);
    }
    //#endregion

  constructor() {
    this._countries = new BehaviorSubject<Country[]>([]);
    this.countries$ = this._countries.asObservable();

    this._continents = new BehaviorSubject<Continent[]>([]);
    this.continents$ = this._continents.asObservable();

    this._gameState = new BehaviorSubject<GameState>(GameState.Initial);
    this.gameState$ = this._gameState.asObservable();
  }

  setConfig(config: Config) {
    this.setContinents(config.continents);
    this.setCountries(config.countries);
  }

}
