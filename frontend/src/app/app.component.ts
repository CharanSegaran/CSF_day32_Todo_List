import { Component } from '@angular/core';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day32_workshop';
  
  todoList: Todo[]=[];

  onTodoArrayChanged(todoArray:Todo[]):void{
    this.todoList = todoArray;
  }
}
