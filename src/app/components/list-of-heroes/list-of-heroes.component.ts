import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../../hero.interface';
import { HeroService } from '../../services/heroes/hero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-of-heroes',
  templateUrl: './list-of-heroes.component.html',
  styleUrls: ['./list-of-heroes.component.css'],
})
export class ListOfHeroesComponent implements OnInit, OnDestroy {

  listOfHeroes: Hero[];
  selectedHero: Hero;
  subscription: Subscription;

  constructor(private service: HeroService) {
    this.listOfHeroes = [];
    this.selectedHero = {
      id: -1,
      name: ''
    };
  }

  ngOnInit() {
    this.subscription = this.service.getData()
      .subscribe(response => {
        this.listOfHeroes = response;
      });
  }

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
  }

  deleteHero(id: number, index: number) {
    this.service.deleteResource(id)
      .subscribe(() => {
        this.listOfHeroes.splice(index, 1);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
