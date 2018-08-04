import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '../../node_modules/@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { ListOfHeroesComponent } from './components/list-of-heroes/list-of-heroes.component';

import { HeroService } from './services/heroes/hero.service';
import { DataService } from './services/data/data.service';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ListOfHeroesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'list',
        component: ListOfHeroesComponent
      },
      {
        path: 'hero/:id',
        component: HeroesComponent
      }
    ])
  ],
  providers: [
    HeroService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
