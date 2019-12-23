import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private username: string;
  private email: string;
  private password: string;
  private password_confirm: string;
  private users: any;
  

  constructor(private registerService : RegisterService, private router: Router) {}

  ngOnInit() {
    
  }


  submit() {

    const formData = {
      'username' : this.username,
      'email': this.email,
      'password': this.password
    };

    console.log(formData);

    this.registerService.create(formData)
      .subscribe(response => {
        console.log( 'username', this.username);
        console.log( 'email', this.email );
        console.log( 'password', this.password);
        console.log(response);
      });
  }
}
