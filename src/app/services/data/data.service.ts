import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http, private url: string) { }

  addResource(resource) {
    return this.http.post(this.url, resource)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }

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

  updateResource(id, fieldName, value) {
    const params = {
      op: 'replace',
      path: fieldName,
      value: value
    };

    return this.http.patch(`${this.url}/${id}`, {
      params: params
    }).pipe(
      catchError((error) => {
        console.log(error);
        throw error;
      })
    );
  }

  deleteResource(id) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }
}
