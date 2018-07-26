import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { ListOfHeroesComponent } from './components/list-of-heroes/list-of-heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ListOfHeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
