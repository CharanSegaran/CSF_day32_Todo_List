import { Component, Input, OnInit} from '@angular/core';
import { Todo } from '../../models/todo';
import { LoggingService } from '../../services/logging/logging.service';
import { ConfettiService } from '../../services/confetti/confetti.service';
import { TodoService } from '../../services/todo/todo.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{
  editable:boolean=false;
  logs:string[]=[];
  @Input() todoList:Todo[]=[];

  constructor(private loggingService:LoggingService,
              private http:HttpClient,
              public confettiService:ConfettiService,
              private todoService:TodoService,
              private router:Router){}

  ngOnInit(): void {
      this.todoService.todoList$.subscribe((todoList: Todo[]) => {
        this.todoList = todoList
      })
  }

  deleteTodoItem(i:number){
    this.todoList.splice(i,1);
  }
  editTodoRow(){
    this.editable = true;
  }
  saveTodoRow(todo:Todo, i:number){
    this.todoList.splice(i,1,todo);
    this.editable=false;
    this.loggingService.log(this.todoList);
  }

  uploadProgress(todo:Todo):void{
    this.todoService.sendTodoTaskTitle(todo.description)
    this.router.navigate(["/progress"])
  }

  celebrate(){
    this.confettiService.celebrate();
  }



}
