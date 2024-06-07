import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm!:FormGroup
  name:FormControl
  username:FormControl
  password:FormControl
  apiValue:string=""


  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router){
    this.name = new FormControl('', Validators.required)
    this.username = new FormControl('', Validators.required)
    this.password = new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')])

    this.signupForm = this.fb.group({
      name:this.name,
      username:this.username,
      password:this.password
    })
  }

  onSubmit():void{
    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched();
      return;
    }
    this.signUp();
  }

  signUp(){

    const signUpFormData = {
      name:this.signupForm.get('name')?.value,
      username:this.signupForm.get('username')?.value,
      password:this.signupForm.get('password')?.value
    }

    this.http.post("http://localhost:8080/signup", signUpFormData ,{responseType:"text"})
    .subscribe({
      next:(value: any)=>{
        this.apiValue = value.toString()
          console.log("Registraion Successful:", value)
          this.router.navigate(["/login"])
      },
      error:(err: any) => {console.log("Registration Unsuccessful:",err)}  
    })
  }
}
