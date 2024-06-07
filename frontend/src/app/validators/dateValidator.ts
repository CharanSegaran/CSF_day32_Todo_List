import { AbstractControl, ValidatorFn } from "@angular/forms";

export function futureDateValidator():ValidatorFn{
    return(control:AbstractControl):{[key:string]:any} | null =>{
        const selectedDate:Date=new Date(control.value);
        const currentDate:Date=new Date();

        if (selectedDate < currentDate){
            return{"pastDate":true}
        }
        return null;
    };
}