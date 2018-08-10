import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageLogService {

  private messages: string[];

  constructor() {
    this.messages = [];
  }

  private isNotNullOrUndefined(msg: string) {
    return (msg !== undefined && msg !== null);
  }

  public addMessage(message) {
    if (this.isNotNullOrUndefined(message)) {
      this.messages.push(message);
    }
  }

  public getMessages() {
    return this.messages;
  }

  public clearMessageLog() {
    this.messages = [];
  }

}
