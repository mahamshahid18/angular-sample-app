import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService extends DataService {

  constructor(http: Http) {
    super(http, 'http://localhost:8000/data');
  }
}
