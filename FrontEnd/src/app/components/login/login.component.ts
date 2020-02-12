import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username: string;
  private email: string;
  private password: string;
  

  constructor(private loginService: LoginService,private router: Router) { }

  ngOnInit() {
  }

  submit(){

    const formData = {
      'username' : this.email,
      'password': this.password,
    };

    this.loginService.loging_api(formData, ).subscribe(response => {
      if(response.status == 200){
        this.router.navigate(['/animes']);
        localStorage.setItem('logged', 'true');
        localStorage.setItem('token',response.body['token']);
      }
    });
  }
}
