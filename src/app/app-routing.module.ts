import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListOfHeroesComponent } from './components/list-of-heroes/list-of-heroes.component';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
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
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
