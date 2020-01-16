import { Directive } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map, debounceTime, take, switchMap } from "rxjs/operators";
import { UserService } from "../services/user.service"

export function uniqueEmailValidator(userService: UserService):AsyncValidatorFn{
  return (c : AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getByEmail(c.value).pipe(
      map(users =>{
        return users  && users.length > 0 ? {'uniqueEmail': true}: null;
      })
    );
  };
}

@Directive({
  selector: '[uniqueEmail]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: CustomEmailValidator, multi:true}]
})

export class CustomEmailValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(c : AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
    return uniqueEmailValidator(this.userService)(c);
  }
}