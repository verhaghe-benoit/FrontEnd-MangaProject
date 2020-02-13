import { ActivatedRoute } from '@angular/router';
import { MangasService } from './../../services/mangas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mangas-details',
  templateUrl: './mangas-details.component.html',
  styleUrls: ['./mangas-details.component.scss']
})
export class MangasDetailsComponent implements OnInit {

  private infos : any;
  private score : any;

  constructor(private mangaService: MangasService,private route: ActivatedRoute) { }

  ngOnInit() {

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

  }

}
