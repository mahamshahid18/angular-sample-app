import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero.interface';
import { heroesList } from '../../heroesList';

@Component({
  selector: 'app-list-of-heroes',
  templateUrl: './list-of-heroes.component.html',
  styleUrls: ['./list-of-heroes.component.css'],
})
export class ListOfHeroesComponent implements OnInit {

  listOfHeroes: Hero[];
  selectedHero: Hero;

  constructor() { }

  ngOnInit() {
    this.listOfHeroes = heroesList;
  }

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
  }

}
