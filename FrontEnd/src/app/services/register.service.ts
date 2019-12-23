import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: HttpClient) { }

  create(user) {
    return this.http.post(`${environment.API}/api/users`, user);
  }

  getAll() {
    return this.http.get(`${environment.API}/api/users`);
  }
}
