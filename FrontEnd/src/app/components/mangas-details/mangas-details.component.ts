import { UserService } from 'src/app/services/user.service';
import { CommentsService } from './../../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MangasService } from './../../services/mangas.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-mangas-details',
  templateUrl: './mangas-details.component.html',
  styleUrls: ['./mangas-details.component.scss']
})
export class MangasDetailsComponent implements OnInit {

  private infos : any;
  private score : any;
  private comment: string;
  private token;
  private logged: any;
  private decoded; 
  private id_user;

  constructor(private mangaService: MangasService,
    private route: ActivatedRoute,
    private commentService : CommentsService,
    private userService : UserService,
    private router: Router,
    public dialog: MatDialog) { }

  openDialog(msg): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50wv',
      height: '20hv',
      data: {title: msg ,comment: this.comment}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.onSubmit()
      };
    });
  }

  ngOnInit() {

    if(localStorage.getItem("logged") == null){
      this.logged = false ;
    }
    
    let id = this.route.snapshot.paramMap.get('id');
    let total = 0;

    this.mangaService.getById(id)
      .subscribe(response => {
        this.infos = response;
        for(let i=0;i<this.infos.scoreRelationMangas.length;i++){
          total = total + this.infos.scoreRelationMangas[i].score;
        }
        this.score = (total/this.infos.scoreRelationMangas.length);
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
      "manga" : "/api/mangas/"+id,
      "user" : "/api/users/"+this.id_user,
      "date" : todayISOString,
      "comment" : this.comment
    };
    
    this.commentService.postCommentOnManga(data).subscribe();
    //this.router.navigate(['/mangas/'+id]);

  }

}
