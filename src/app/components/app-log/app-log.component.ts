import { Component, OnInit } from '@angular/core';
import { MessageLogService } from '../../services/messageLog/messageLog.service';

@Component({
  selector: 'app-log',
  templateUrl: './app-log.component.html',
  styleUrls: ['./app-log.component.css']
})
export class AppLogComponent implements OnInit {

  constructor(public log: MessageLogService) {
  }

  ngOnInit() {  }

}
