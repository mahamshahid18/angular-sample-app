import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../hero.interface';
import { HeroService } from '../../../services/heroes/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topHeroes: Hero[];
  limitTopHeroes: number;

  constructor(private service: HeroService) {
    this.topHeroes = [];
    this.limitTopHeroes = 4;
  }

  ngOnInit() {
    this.service.getData(this.limitTopHeroes)
      .subscribe((response) => {
        this.topHeroes = response;
      });
  }

}
