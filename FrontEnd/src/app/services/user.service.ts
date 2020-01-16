import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getByEmail(email :string){
    return this.http.get<any []>(`${environment.API}/api/users.json?email=${email}`);   
  }

  getByUsername(username :string){
    return this.http.get<any []>(`${environment.API}/api/users.json?username=${username}`);   
  }
}



        