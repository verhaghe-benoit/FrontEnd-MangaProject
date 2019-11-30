import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../animations'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username: string;
  private email: string;
  private password: string;

  constructor() { }

  ngOnInit() {
  }

}
