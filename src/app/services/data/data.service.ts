import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageLogService } from '../../services/messageLog/messageLog.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  protected serviceName: string;

  constructor(private http: Http,
    private url: string,
    private log: MessageLogService) {
      this.serviceName = 'DataService';
  }

  ngOnInit() {
    console.log(this.log.getMessages());
  }

  addResource(resource) {
    return this.http.post(this.url, resource)
      .pipe(
        tap(() => this.msgLog('Hero added')),
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
        tap(() => this.msgLog('Heroes fetched from server')),
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
        tap(() => this.msgLog(`Hero with id: ${id} fetched`)),
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
      tap(() => this.msgLog(`Hero with id: ${id} -- ${fieldName} updated to: ${value}`)),
      catchError((error) => {
        console.log(error);
        throw error;
      })
    );
  }

  deleteResource(id) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        tap(() => this.msgLog(`Hero with id: ${id} deleted`)),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
  }

  search(term: string) {
    return this.http.get(`${this.url}?term=${term}`)
      .pipe(
        map(response => response.json()),
        tap(() => this.msgLog(`Search for heroes made with term: ${term}`)),
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
    }

  msgLog(message: string) {
      this.log.addMessage(`${this.serviceName}: ${message}`);
  }
}
