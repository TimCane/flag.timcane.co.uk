import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsStore {

  //#region selectedContinents
  private readonly _selectedContinents: BehaviorSubject<string[]>;
  readonly selectedContinents$: Observable<string[]>;

  get selectedContinents(): string[] {
    return this._selectedContinents.getValue();
  }

  set selectedContinents(val: string[]) {
    this._selectedContinents.next(val);
  }
  //#endregion

  //#region duration
  private readonly _duration: BehaviorSubject<number>;
  readonly duration$: Observable<number>;

  get duration(): number {
    return this._duration.getValue();
  }

  set duration(val: number) {
    this._duration.next(val);
  }
  //#endregion

  //#region randomise
  private readonly _randomise: BehaviorSubject<boolean>;
  readonly randomise$: Observable<boolean>;

  get randomise(): boolean {
    return this._randomise.getValue();
  }

  set randomise(val: boolean) {
    this._randomise.next(val);
  }
  //#endregion

  //#region tabCompletion
  private readonly _tabCompletion: BehaviorSubject<boolean>;
  readonly tabCompletion$: Observable<boolean>;

  get tabCompletion(): boolean {
    return this._tabCompletion.getValue();
  }

  set tabCompletion(val: boolean) {
    this._tabCompletion.next(val);
  }
  //#endregion

  //#region typeAhead
  private readonly _typeAhead: BehaviorSubject<boolean>;
  readonly typeAhead$: Observable<boolean>;

  get typeAhead(): boolean {
    return this._typeAhead.getValue();
  }

  set typeAhead(val: boolean) {
    this._typeAhead.next(val);
  }
  //#endregion

  //#region typeAheadFiltered
  private readonly _typeAheadFiltered: BehaviorSubject<boolean>;
  readonly typeAheadFiltered$: Observable<boolean>;

  get typeAheadFiltered(): boolean {
    return this._typeAheadFiltered.getValue();
  }

  set typeAheadFiltered(val: boolean) {
    this._typeAheadFiltered.next(val);
  }
  //#endregion



  constructor() {
    this._selectedContinents = new BehaviorSubject<string[]>([]);
    this.selectedContinents$ = this._selectedContinents.asObservable();

    this._duration = new BehaviorSubject<number>(20);
    this.duration$ = this._duration.asObservable();

    this._randomise = new BehaviorSubject<boolean>(true);
    this.randomise$ = this._randomise.asObservable();

    this._tabCompletion = new BehaviorSubject<boolean>(true);
    this.tabCompletion$ = this._tabCompletion.asObservable();

    this._typeAhead = new BehaviorSubject<boolean>(true);
    this.typeAhead$ = this._typeAhead.asObservable();

    this._typeAheadFiltered = new BehaviorSubject<boolean>(false);
    this.typeAheadFiltered$ = this._typeAheadFiltered.asObservable();
  }

  update(settings: Settings){
    this.selectedContinents = settings.selectedContinents;
    this.duration = settings.duration;
    this.randomise = settings.randomise;
    this.tabCompletion = settings.tabCompletion;
    this.typeAhead = settings.typeAhead;
    this.typeAheadFiltered = settings.typeAheadFiltered;
  }

}
