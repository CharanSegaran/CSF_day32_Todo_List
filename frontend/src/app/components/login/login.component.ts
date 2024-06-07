import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authetication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup
  username:FormControl
  password:FormControl
  loginError:String=""
  userIdValue:string=""

  constructor(private fb:FormBuilder, private authService:AuthenticationService, private router:Router){
    this.username = new FormControl('',Validators.required)
    this.password = new FormControl('',Validators.required)

    this.loginForm = this.fb.group({
      username:this.username,
      password:this.password
    })
  }

  login(){
    this.authService.login(this.username.value, this.password.value).subscribe({
      next:(value: any) =>{
        // this.router.navigate([{ outlets: { primaryOutlet: ['todo'] } }]);
        this.router.navigate(["/todo"])
        console.log(value)

        //reading a cookie sent by spring-boot without ngx-cookie-service library
        const userIdCookie = document.cookie
                                      .split("; ")
                                      .find(cookie => cookie.startsWith("user-id="))
        if(userIdCookie){
          this.userIdValue = userIdCookie.split("=")[1]
          console.log(`User Id Value: ${this.userIdValue}`)
          this.authService.todoLocalStorage.add({
            cookie:this.userIdValue
          })
        }else {   
          console.log("User ID not found")
        }

      },
      error: (err: any) => {
        console.log(">>>User denied: ",err)
        this.loginError = "Wrong username or password, please try again!"
      },
    })
  }


  ngOnInit(): void {
      
  }

  signUp():void{
    this.router.navigate(["/sign-up"])
  }
}
