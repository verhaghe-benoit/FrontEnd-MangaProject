import { Component, OnInit } from '@angular/core';

import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
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
  

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
  }


  submit() {

    const formData = {
          'username': this.username,
          'email': this.email,
          'password': this.password
        };


    console.log(formData);
     
    if(this.password == this.password_confirm){
      this.http.post(`${environment.API}/api/users`, formData)
            .subscribe(response => {
              console.log( 'username', this.username);
              console.log( 'email', this.email);
              console.log( 'password', this.password);
              console.log(response);
      });
    }
  }
}
