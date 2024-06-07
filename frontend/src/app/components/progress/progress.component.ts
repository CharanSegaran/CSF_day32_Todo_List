import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo/todo.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit{
  title:string="hi"
  description!:FormControl
  file!:FormControl
  uploadForm!:FormGroup

  constructor(private todoService:TodoService, 
              private fb:FormBuilder, 
              private http:HttpClient){
  }

  sub$!:Subscription

  ngOnInit(): void {
    // firstValueFrom(
    //   this.todoService.event.asObservable().pipe())
    //       .then((result:string) =>{
    //         this.title=result
    //         console.log("title", this.title)
    //       })

    this.sub$=this.todoService.event.subscribe((value:string)=>{
      console.log(value)
      this.title=value
    })
    console.log(this.title)
    this.description = new FormControl('',Validators.required)
    this.file = new FormControl('', Validators.required)

    this.uploadForm = this.fb.group({
      description:this.description,
      file:this.file
    })
  
  }

  onSubmit(){
    const formData = new FormData();
    formData.append("file", this.uploadForm.get("file")?.value)
    formData.append("description", this.uploadForm.get("description")?.value)

    this.http.post("http://localhost:8080/upload", formData).subscribe({
      response:(res:any)=>{
        console.log(res)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  // ngOnDestroy():void{
  //   this.sub$.unsubscribe()
  // }
}
