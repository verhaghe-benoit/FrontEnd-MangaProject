import { Directive } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, debounceTime, take, switchMap } from "rxjs/operators";
import { UserService } from "../services/user.service"

export function uniqueUsernameValidator(userService: UserService):AsyncValidatorFn{
  return (c : AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getByUsername(c.value).pipe(
      map(users =>{
        return users  && users.length > 0 ? {'uniqueUsername': true}: null;
      })
    );
  };
}

@Directive({
  selector: '[uniqueUsername]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomUsernameValidator, multi:true}]
})

export class CustomUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(c : AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
    return uniqueUsernameValidator(this.userService)(c);
  }
}