import { AnimesService } from './../../services/animes.service';
import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-animes-details',
  templateUrl: './animes-details.component.html',
  styleUrls: ['./animes-details.component.scss']
})
export class AnimesDetailsComponent implements OnInit {

  private infos : any;
  private score : any;

  constructor( private animesService : AnimesService,private route: ActivatedRoute ) { }

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

    

    
  }

}
