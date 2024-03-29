import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  constructor(private http: HttpClient) { }

  getAnimeByFilter(genre){
    if(genre == ""){
      return this.http.get(`${environment.API}/api/animes.json`);
    }else{
      return this.http.get(`${environment.API}/api/animes.json?${genre}`);
    }
  }

  getAnimeByTitle(title){
    if(title == ""){
      return this.http.get(`${environment.API}/api/animes.json`);
    }else{
      return this.http.get(`${environment.API}/api/animes.json?title=${title}`);
    }
  }

  getAnimeByStatus(status){
      return this.http.get(`${environment.API}/api/animes.json?status=${status}`);
  }

  getAnimeByStatusOrTitle(my_filter){
    return this.http.get(`${environment.API}/api/animes.json?order[title]=asc&${my_filter}`);
  }

  getAll() {
    return this.http.get(`${environment.API}/api/animes.json?order[title]=asc`);
  }

  getById(id) {
    return this.http.get(`${environment.API}/api/animes/${id}.json`);
  }
}

