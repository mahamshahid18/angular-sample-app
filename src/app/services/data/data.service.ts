import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http, private url: string) { }

  getData(limit?: number) {
    return this.http.get(this.url)
      .pipe(
        map(response => {
          if (limit) {
            return response.json().filter(item => {
              return item.id <= limit;
            });
          }
          return response.json();
        }),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }

  getDataById(id) {
    return this.http.get(`${this.url}/${id}`)
      .pipe(
        map(response => response.json()),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
}
