import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';
import Dexie, {Table} from 'dexie';

export interface userCookie{
  id?:number;
  cookie:string; 
}

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService extends Dexie{



  todoLocalStorage!: Dexie.Table<userCookie,number>

  constructor(private http:HttpClient) { 
    super('todo.db')

    this.version(1).stores({
      todoLocalStorage:"++id"
    })
    this.todoLocalStorage = this.table("todoLocalStorage")
  }



  login(username:string, password:string): Observable<any>{
    console.log(username,password)
    return this.http.post("http://localhost:8080/login", {username,password}, {
        responseType:"text",
        withCredentials:true
    });
  }
}
