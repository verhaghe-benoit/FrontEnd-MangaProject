import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loging_api(user) {
    return this.http.post(`${environment.API}/api/login_check`, user, {observe : 'response'});
  }
}
