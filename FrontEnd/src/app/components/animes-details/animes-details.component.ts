import { UserService } from './../../services/user.service';
import { CommentsService } from './../../services/comments.service';
import { AnimesService } from './../../services/animes.service';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-animes-details',
  templateUrl: './animes-details.component.html',
  styleUrls: ['./animes-details.component.scss']
})
export class AnimesDetailsComponent implements OnInit {

  private infos : any;
  private score : any;
  private comment: string;
  private token;
  private decoded; 
  private id_user;

  constructor( private animesService : AnimesService,private commentService : CommentsService,private userService : UserService, private route: ActivatedRoute,private router: Router ) { }

  ngOnInit() {


    let id = this.route.snapshot.paramMap.get('id');
    let total = 0;

    this.animesService.getById(id)
      .subscribe(response => {
        this.infos = response;
        for(let i=0;i<this.infos.scoreRelations.length;i++){
          total = total + this.infos.scoreRelations[i].score;
        }
        this.score = (total/this.infos.scoreRelations.length);
      });

      if(localStorage.getItem("token") != null){
        this.token = localStorage.getItem("token");
        this.decoded = jwt_decode(this.token);
        this.userService.getByUsername(this.decoded['username']).subscribe( response => {
          this.id_user = response
          this.id_user = this.id_user[0].id;
        });
      }
  }

  onSubmit(){
    
    let id = this.route.snapshot.paramMap.get('id');

    let todayISOString = new Date().toISOString();

    const data = {
      "anime" : "/api/animes/"+id,
      "user" : "/api/users/"+this.id_user,
      "date" : todayISOString,
      "comment" : this.comment
    };
    
    this.commentService.postCommentOnAnime(data).subscribe();

  }

}