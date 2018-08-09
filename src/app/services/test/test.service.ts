import { Injectable, OnDestroy } from '@angular/core';
import { AppMessage } from '../../appMessages.interface';

@Injectable({
  providedIn: 'root'
})
export class TestService implements OnDestroy {

  constructor() { }

  public consoleLog() {
    console.log('service working!');
  }

  ngOnDestroy() {
    this.consoleLog();
  }
}
