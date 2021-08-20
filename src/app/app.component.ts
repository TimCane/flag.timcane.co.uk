import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { GameState } from './enums/game-state.enum';
import { Config } from './models/config';
import { Settings } from './models/settings';
import { DataService } from './services/data.service';
import { DataStore } from './stores/data.store';
import { Wait } from './utils/wait';

@Component({
  selector: 'flag-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private data: DataService, private state: DataStore) {
    this.state.gameState = GameState.Loading;
  }

  get gameState$(): Observable<GameState>{
    return this.state.gameState$;
  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {

    forkJoin([this.data.load(), Wait.atleast(2000)])    
      .subscribe(
        (result) => {
          this.state.setConfig(result[0]);

          this.state.gameState = GameState.Menu;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  start() {
    this.state.gameState = GameState.InProgress;
  }
}
