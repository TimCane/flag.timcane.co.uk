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
  @Output() onStart: EventEmitter<void>;

  form: FormGroup;

  //#region Form Elements
  get selectedContinents(): FormArray {
    return this.form.get("selectedContinents") as FormArray;
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
    this.onStart = new EventEmitter<void>();

    this.form = this.fb.group({
      selectedContinents: this.fb.array([], [Validators.required]),
      duration: this.fb.control(this.settings.duration, [Validators.required, Validators.min(0)]),
      randomise: this.fb.control(this.settings.randomise),
      typeAhead: this.fb.control(this.settings.typeAhead),
      tabCompletion: this.fb.control(this.settings.tabCompletion),
      typeAheadFiltered: this.fb.control(this.settings.typeAheadFiltered)
    })
  }

  ngOnInit(): void {

    var options: string[] = [];
    this.state.continents.forEach(continent => {
      this.selectedContinents.push(new FormControl(continent.id))
      options.push(continent.id);
    });

    this.settings.selectedContinents = options;
  }

  isSelected(id: string) {
    return this.selectedContinents.controls.some((ctrl: AbstractControl) => ctrl.value == id);
  }

  onContinentChange(event: any) {
    if (event.target.checked) {
      this.selectedContinents.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;

      this.selectedContinents.controls.forEach((ctrl: AbstractControl) => {
        if (ctrl.value == event.target.value) {
          this.selectedContinents.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.settings.update(this.form.value);
      this.onStart.emit();
    }
  }
}
