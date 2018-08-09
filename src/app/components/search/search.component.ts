import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero.interface';
import { HeroService } from '../../services/heroes/hero.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  heroe$: Observable<Hero[]>;
  searchArray: Subject<string>;

  constructor(private service: HeroService) {
    this.heroe$ = new Observable<Hero[]>();
    this.searchArray = new Subject<string>();
  }

  searchHeros(searchTerm) {
    const term = searchTerm.trim().toLowerCase();
    this.searchArray.next(term);
  }

  ngOnInit() {
    this.heroe$ = this.searchArray.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) => {
        return this.service.search(term);
      })
    );
  }


}
