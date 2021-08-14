import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Continent } from 'src/app/models/continent';
import { Settings } from 'src/app/models/settings';

@Component({
  selector: 'flag-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() continents: Continent[];
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

  constructor(private fb: FormBuilder) {
    this.continents = [];
    this.onStart = new EventEmitter<Settings>();

    this.form = this.fb.group({
      continentArray: this.fb.array([], [Validators.required]),
      duration: this.fb.control(20, [Validators.required, Validators.min(0)]),
      randomise: this.fb.control(true),
      typeAhead: this.fb.control(true),
      tabCompletion: this.fb.control(true),
      typeAheadFiltered: this.fb.control(false)
    })
  }

  ngOnInit(): void {
    this.continents.forEach(continent => this.continentArray.push(new FormControl(continent.id)))
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
    if(this.form.valid){
      this.onStart.emit(this.form.value);
    }
  }
}
