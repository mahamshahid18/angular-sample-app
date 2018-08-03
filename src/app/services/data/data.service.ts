import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http, private url: string) { }

  getData() {
    return this.http.get(this.url)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
}
