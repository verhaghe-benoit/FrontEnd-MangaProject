import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  postCommentOnAnime(data){
    return this.http.post(`${environment.API}/api/comments_animes`,data);
  }

  postCommentOnManga(data){
    return this.http.post(`${environment.API}/api/comments_mangas`,data);
  }
}
