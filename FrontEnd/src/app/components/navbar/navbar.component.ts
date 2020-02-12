import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private logged = localStorage.getItem("logged");
  private token;
  private decoded; 

  constructor() { }

  ngOnInit() {

    if(localStorage.getItem("token") != null){
      this.token = localStorage.getItem("token");
      this.decoded = jwt_decode(this.token);
    }

  }

}
