import { Injectable, OnDestroy } from '@angular/core';
import { AppMessage } from '../../appMessages.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageLogService implements OnDestroy {

  private messages;

  constructor() {
    this.messages = [];
  }

  private messageNotEmpty(message: AppMessage) {
    const keys = Object.keys(message);
    return keys.length &&
      this.isNotNullOrUndefined(message[keys[0]]) &&
      this.isNotNullOrUndefined(message[keys[1]]);
  }

  private isNotNullOrUndefined(term: string) {
    return (term !== undefined && term !== null);
  }

  public addMessage(message: AppMessage) {
    console.log('add message called');
    console.log(this.messages);
    if (this.messageNotEmpty(message)) {
      this.messages.push(message);
      // console.log(message);
    }
  }

  public getMessages() {
    console.log('returning: ');
    console.log(this.messages);
    return this.messages;
  }

  public clearMessageLog() {
    this.messages = [];
  }

  ngOnDestroy() {
    this.clearMessageLog();
  }

}
