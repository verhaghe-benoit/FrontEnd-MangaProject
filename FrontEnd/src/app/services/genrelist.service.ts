import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenrelistService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.API}/api/genre_lists.json`);
  }
}
