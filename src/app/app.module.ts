import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { ListOfHeroesComponent } from './components/list-of-heroes/list-of-heroes.component';

import { HeroService } from './services/heroes/hero.service';
import { DataService } from './services/data/data.service';
import { HttpModule } from '../../node_modules/@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ListOfHeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HeroService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
