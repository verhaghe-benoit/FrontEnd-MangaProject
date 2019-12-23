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

  private infos;

  constructor( private animesService : AnimesService,private route: ActivatedRoute,
    private router: Router, ) { }

  ngOnInit() {


    let id = this.route.snapshot.paramMap.get('id');

    this.animesService.getById(id)
      .subscribe(response => {
        this.infos = response;
      });

  }

}
