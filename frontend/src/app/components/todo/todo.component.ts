import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo';
import { futureDateValidator } from '../../validators/dateValidator';
import { TodoService } from '../../services/todo/todo.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todoForm!:FormGroup
  todoArray:Todo[]=[]
  currentTodo!:Todo
  description:FormControl
  date:FormControl = new FormControl()
  priority:FormControl
  constructor(private fb:FormBuilder,
              private todoService:TodoService,
              private router:Router,
              private http:HttpClient){

    this.description=new FormControl('', Validators.required),
    this.date = new FormControl('', [Validators.required, futureDateValidator()]),
    this.priority = new FormControl('',Validators.required)

    this.todoForm = this.fb.group({
      description:this.description,
      date:this.date,
      priority:this.priority})
    }
  ngOnInit():void{
    this.http.get<Todo[]>("http://localhost:8080/getTodoList", {withCredentials:true}).subscribe({
      next:(value:any)=>{
        this.todoArray = value
        this.todoService.sendTodoList(this.todoArray)
      },
      error:(err:any)=>{
        console.log("User has no todo tasks yet")
      }
    })
  }
  
  onSubmit():void{
    if(this.todoForm.invalid){
      this.todoForm.markAllAsTouched();
      return;
    }
    this.addTodo();
  }

  addTodo(){
    let desc = this.todoForm.get("description")?.value;
    let date = this.todoForm.get("date")?.value;
    let priority = this.todoForm.get("priority")?.value;
    let todo = new Todo(desc,date,priority);
    this.todoArray.push(todo);
    console.log(this.todoArray)
    // this.sendTodoList.emit(this.todoArray)
    this.todoService.sendTodoList(this.todoArray)

    this.http.post<Todo[]>("http://localhost:8080/save", this.todoArray, {withCredentials:true}).subscribe({
      next:(value: any)=>{
          console.log(">>>Todo array saved", value)
      },
      error:(err: any)=>{
          
      }
    })
  }

  // @Output() sendTodoList = new EventEmitter<Todo[]>();
  
  getDescriptionErrorMessage():string{
    if(this.todoForm.get('description')?.hasError('required')){
      return "Description is required"
    }
    return ""
  }

  isToday(selectedDate:Date):boolean{
    const today = new Date();
    const selectedDate1 = new Date(selectedDate);
    return selectedDate1.toDateString() === today.toDateString();
  }

  logOut():void{
    this.router.navigate(["/login"])
  }

}
