import { Component, OnInit, Input } from '@angular/core';
import { HeroStructure } from '../../hero.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  @Input() name: String;
  hero: HeroStructure;

  constructor() { }

  ngOnInit() {
    this.hero = {
      id: 1,
      name: this.name
    };
  }

}
