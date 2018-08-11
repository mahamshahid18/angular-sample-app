import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/heroes/hero.service';
import { Hero } from '../../hero.interface';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnDestroy {

  @Input() name: String;
  hero: Hero;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private service: HeroService,
    private location: Location) {
      this.hero = {
        id: 0,
        name: ''
      };
  }

  ngOnInit() {
    let heroId: number;
    this.subscription = this.route.paramMap
      .pipe(
        switchMap(params => {
          if (params.has('id')) {
            heroId = +params.get('id');
            return this.service.getDataById(heroId);
          }
        })
      )
      .subscribe(response => {
        this.hero = response[0];
      });
  }

  updateHero() {
    this.service.updateResource(this.hero.id, 'name', this.hero.name)
      .subscribe();
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
