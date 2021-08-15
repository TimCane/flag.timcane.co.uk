import { Component, OnInit } from '@angular/core';
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
  gameState: GameState;

  constructor(private data: DataService, private state: DataStore) {

    this.gameState = GameState.Loading;
  }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig() {
    this.data.load()
      .subscribe(
        (config: Config) => {
          this.state.setConfig(config);

          this.gameState = GameState.Menu;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  start(settings: Settings) {
    console.log("hello")
    console.log(settings);

    this.gameState = GameState.InProgress;
  }
}
