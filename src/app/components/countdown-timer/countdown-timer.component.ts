import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'flag-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, OnChanges {

  get class() {
    if (this.remainingTime == 0) {
      return "p-0";
    }
    
    if (this.remainingTime <= this.twentyPercent){
      return "p-20";
    }

    if(this.remainingTime <= this.fiftyPercent){
      return "p-50";
    }

    return "";
  }

  fiftyPercent: number;
  twentyPercent: number;

  @Input() remainingTime: number;

  get seconds() {
    return this.remainingTime % 60;
  }

  get minutes() {
    return Math.floor(this.remainingTime / 60);
  }

  constructor() {
    this.remainingTime = 0;
    this.fiftyPercent = 0;
    this.twentyPercent = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.remainingTime) {
      this.remainingTime = changes.remainingTime.currentValue;
    }
  }

  ngOnInit(): void {
    this.twentyPercent = (this.remainingTime * 20) / 100;
    this.fiftyPercent = (this.remainingTime * 50) / 100;
  }
}
