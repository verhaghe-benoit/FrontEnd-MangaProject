import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangasService {

  constructor(private http: HttpClient) { }


  getMangaByStatusOrTitle(my_filter){
    return this.http.get(`${environment.API}/api/mangas.json?${my_filter}`);
  }

  getAll() {
    return this.http.get(`${environment.API}/api/mangas.json`);
  }

  getById(id) {
    return this.http.get(`${environment.API}/api/mangas/${id}.json`);
  }

}
