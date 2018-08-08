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
  addBtnClicked: boolean;

  constructor(private service: HeroService) {
    this.listOfHeroes = [];
    this.selectedHero = {
      id: -1,
      name: ''
    };
    this.addBtnClicked = false;
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

  addHero(name: string) {
    const item: Hero = {
      id: this.listOfHeroes.length + 1,
      name: name
    };
    this.service.addResource({'item': item})
      .subscribe(() => {
        this.listOfHeroes.push(item);
      });
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
