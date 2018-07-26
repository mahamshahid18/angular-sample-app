import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../hero.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  @Input() name: String;
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
    // this.hero = {
    //   id: 1,
    //   name: this.name
    // };
  }

}
