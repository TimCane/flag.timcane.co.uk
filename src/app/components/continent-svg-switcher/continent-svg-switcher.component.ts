import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flag-continent-svg-switcher',
  templateUrl: './continent-svg-switcher.component.html',
  styleUrls: ['./continent-svg-switcher.component.scss']
})
export class ContinentSvgSwitcherComponent implements OnInit {

  @Input() continentId: string;

  constructor() {
    this.continentId = "";
  }

  ngOnInit(): void {
  }

}
