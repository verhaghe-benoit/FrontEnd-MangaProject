import { UserService } from './../../services/user.service';
import { CommentsService } from './../../services/comments.service';
import { AnimesService } from './../../services/animes.service';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

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
  private logged;
  private anime_id;
  private isShow;

  constructor( private animesService : AnimesService,
    private commentService : CommentsService,
    private userService : UserService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50wv',
      height: '20hv',
      data: {title: "Are you sure you want to post this comment ?" ,comment: this.comment}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.onSubmit()
      };
    });
  }

  getInfos(){

    this.anime_id = this.route.snapshot.paramMap.get('id');
    let total = 0;

    this.animesService.getById(this.anime_id)
      .subscribe(response => {
        this.infos = response;
        for(let i=0;i<this.infos.scoreRelations.length;i++){
          total = total + this.infos.scoreRelations[i].score;
        }
        this.score = (total/this.infos.scoreRelations.length);
      });
  }

  ngOnInit() {

    this.isShow = false;

    if(localStorage.getItem("logged") == null){
      this.logged = false ;
    }

    this.getInfos();

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
    
    this.anime_id = this.route.snapshot.paramMap.get('id');

    let todayISOString = new Date().toISOString();

    const data = {
      "anime" : "/api/animes/"+this.anime_id,
      "user" : "/api/users/"+this.id_user,
      "date" : todayISOString,
      "comment" : this.comment
    };
    
    this.commentService.postCommentOnAnime(data).subscribe();
    this.getInfos();

  }

  toggleDisplay() {
    this.isShow = true;
  }
}
