import { map } from 'rxjs/operators';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MustMatch } from '../../validators/must-match.validator';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { uniqueEmailValidator } from '../../validators/custom-email-validator.directive';
import { uniqueUsernameValidator } from '../../validators/custom-username-validator.directive';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  private username: string;
  private email: string;
  private password: string;
  private confirm_password: string;
  //private users: any;
  

  constructor(private userService: UserService,private registerService : RegisterService, private formBuilder: FormBuilder,private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      
      username: ['', Validators.required, uniqueUsernameValidator(this.userService)],
      email: ['', [Validators.required, Validators.email], uniqueEmailValidator(this.userService)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirm_password')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    let $data = JSON.stringify(this.registerForm.value);
    this.registerService.create($data).subscribe();
    this.router.navigate(['/login']);

  }
}
