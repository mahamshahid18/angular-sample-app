import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero.interface';
import { HeroService } from '../../services/heroes/hero.service';

@Component({
  selector: 'app-list-of-heroes',
  templateUrl: './list-of-heroes.component.html',
  styleUrls: ['./list-of-heroes.component.css'],
})
export class ListOfHeroesComponent implements OnInit {

  listOfHeroes: Hero[];
  selectedHero: Hero;

  constructor(private service: HeroService) {
    this.listOfHeroes = [];
    this.selectedHero = {
      id: -1,
      name: ''
    };
  }

  ngOnInit() {
    this.service.getData()
      .subscribe(response => {
        this.listOfHeroes = response.json();
      });
  }

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
  }

}
