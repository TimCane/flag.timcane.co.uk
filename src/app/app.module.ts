import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { ContinentSvgSwitcherComponent } from './components/continent-svg-switcher/continent-svg-switcher.component';
import { EuropeSvgComponent } from './components/continent-svg-switcher/europe-svg/europe-svg.component';
import { AfricaSvgComponent } from './components/continent-svg-switcher/africa-svg/africa-svg.component';
import { AsiaSvgComponent } from './components/continent-svg-switcher/asia-svg/asia-svg.component';
import { NorthAmericaSvgComponent } from './components/continent-svg-switcher/north-america-svg/north-america-svg.component';
import { OceaniaSvgComponent } from './components/continent-svg-switcher/oceania-svg/oceania-svg.component';
import { SouthAmericaSvgComponent } from './components/continent-svg-switcher/south-america-svg/south-america-svg.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    MenuComponent,
    GameComponent,
    CountdownTimerComponent,
    ContinentSvgSwitcherComponent,
    EuropeSvgComponent,
    AfricaSvgComponent,
    AsiaSvgComponent,
    NorthAmericaSvgComponent,
    OceaniaSvgComponent,
    SouthAmericaSvgComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
