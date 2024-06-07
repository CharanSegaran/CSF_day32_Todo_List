import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  private logSubject = new Subject<string>();

  log(todoList:Todo[]){
    const logMessage = "Todo List: " + JSON.stringify(todoList);
    console.log(logMessage);
    this.logSubject.next(logMessage);
  }

  getLogObservable(){
    return this.logSubject.asObservable();
  }
}
