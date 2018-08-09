import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppMessage } from '../../appMessages.interface';
import { MessageLogService } from '../../services/messageLog/messageLog.service';

@Component({
  selector: 'app-app-log',
  templateUrl: './app-log.component.html',
  styleUrls: ['./app-log.component.css']
})
export class AppLogComponent implements OnInit {

  public message$: Observable<AppMessage[]>;

  constructor(public log: MessageLogService) {
    this.message$ = new Observable<AppMessage[]>();
  }

  ngOnInit() {
    // console.log(this.log.getMessages());
    this.message$ = of(this.log.getMessages());
    // console.log(this.message$);
  }

  clearMessages() {
    this.log.clearMessageLog();
  }

}
