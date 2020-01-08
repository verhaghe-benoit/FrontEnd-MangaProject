import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Anime} from '../models/anime.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimesService {

  constructor(private http: HttpClient) { }

  getAnimeByFilter(genre){
    if(genre == ""){
      return this.http.get(`${environment.API}/api/animes.json`);
    }else{
      return this.http.get(`${environment.API}/api/animes.json?genreLists.genre=${genre}`);
    }
  }

  getAll() {
    return this.http.get(`${environment.API}/api/animes.json`);
  }

  getById(id) {
    return this.http.get(`${environment.API}/api/animes.json/${id}`);
  }

}

