import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProgressComponent } from './components/progress/progress.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"todo", component:TodoComponent},
  {path:"todo-list", component:TodoListComponent},
  {path: "sign-up", component:SignUpComponent},
  {path: "progress", component:ProgressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
