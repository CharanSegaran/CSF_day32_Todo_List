import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Todo } from '../../models/todo';
import { Observable } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoListSubject = new BehaviorSubject<Todo[]>([]);
  todoList$ = this.todoListSubject.asObservable();

  event = new Subject<string>()
  todoTaskTitle$!:Promise<string>

  constructor() { }

  sendTodoList(todoList:Todo[]){
    this.todoListSubject.next(todoList)
  }

  sendTodoTaskTitle(todoTaskTitle:string):Observable<string>{
     this.event.next(todoTaskTitle)
     return this.event
  }
}
