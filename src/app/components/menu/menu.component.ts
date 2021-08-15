import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Continent } from 'src/app/models/continent';
import { Settings } from 'src/app/models/settings';
import { DataStore } from 'src/app/stores/data.store';
import { SettingsStore } from 'src/app/stores/settings.store';

@Component({
  selector: 'flag-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() onStart: EventEmitter<Settings>;

  form: FormGroup;

  //#region Form Elements
  get continentArray(): FormArray {
    return this.form.get("continentArray") as FormArray;
  }

  get duration(): FormControl {
    return this.form.get("duration") as FormControl;
  }

  get randomise(): FormControl {
    return this.form.get("randomise") as FormControl;
  }

  get typeAhead(): FormControl {
    return this.form.get("randomise") as FormControl;
  }

  get tabCompletion(): FormControl {
    return this.form.get("randomise") as FormControl;
  }

  get typeAheadFiltered(): FormControl {
    return this.form.get("randomise") as FormControl;
  }
  //#endregion  

  get continents$(): Observable<Continent[]> {
    return this.state.continents$;
  }

  constructor(private fb: FormBuilder, private state: DataStore, private settings: SettingsStore) {
    this.onStart = new EventEmitter<Settings>();

    this.form = this.fb.group({
      continentArray: this.fb.array([], [Validators.required]),
      duration: this.fb.control(this.settings.duration, [Validators.required, Validators.min(0)]),
      randomise: this.fb.control(this.settings.randomise),
      typeAhead: this.fb.control(this.settings.typeAhead),
      tabCompletion: this.fb.control(this.settings.tabCompletion),
      typeAheadFiltered: this.fb.control(this.settings.typeAheadFiltered)
    })
  }

  ngOnInit(): void {
    this.state.continents.forEach(continent => this.continentArray.push(new FormControl(continent.id)))
  }

  onContinentChange(event: any) {
    if (event.target.checked) {
      this.continentArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;

      this.continentArray.controls.forEach((ctrl: AbstractControl) => {
        if (ctrl.value == event.target.value) {
          this.continentArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {

      this.settings.duration = this.form.value.duration;

      //this.onStart.emit(this.form.value);
    }
  }
}
