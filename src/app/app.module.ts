import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListOfHeroesComponent } from './components/list-of-heroes/list-of-heroes.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { SearchComponent } from './components/search/search.component';
import { AppLogComponent } from './components/app-log/app-log.component';

import { HeroService } from './services/heroes/hero.service';
import { DataService } from './services/data/data.service';
import { MessageLogService } from './services/messageLog/messageLog.service';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    ListOfHeroesComponent,
    DashboardComponent,
    SearchComponent,
    AppLogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    HeroService,
    DataService,
    MessageLogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
