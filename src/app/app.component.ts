import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameState } from './enums/game-state.enum';
import { Config } from './models/config';
import { Settings } from './models/settings';
import { DataService } from './services/data.service';
import { DataStore } from './stores/data.store';

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
    this.data.load()
      .subscribe(
        (config: Config) => {
          this.state.setConfig(config);

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
