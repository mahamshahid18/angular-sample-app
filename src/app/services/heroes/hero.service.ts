import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../data/data.service';
import { MessageLogService } from '../messageLog/messageLog.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService extends DataService {

  constructor(http: Http, log: MessageLogService) {
    super(http, 'http://localhost:8000/data', log);

    this.logMessage.serviceName = 'HeroService';
  }
}
