import { AnimesService } from './../../services/animes.service';
import { GenrelistService } from './../../services/genrelist.service';
import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss']
})
export class AnimesComponent implements OnInit {

  private genre_list: any;
  private animes_list: any;
  private genre_filter = [];
  

  constructor( private genreListService: GenrelistService, private animesService: AnimesService ) {}

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    
      this.genreListService.getAll()
      .subscribe(response => {
        this.genre_list = response;
      });
    
      this.animesService.getAll()
      .subscribe(response => {
        this.animes_list = response;
      });
  }

  /*
  FilterAnime(genre) {
    this.animesService.getAnimeByFilter(genre)
    .subscribe(response=> {
      this.animes_list = response;
      console.log(this.animes_list);
    });
  }*/

  FilterAnime(genre){
    var pushable = 1;
    if(this.genre_filter.length == 0){
      this.genre_filter.push(genre);
    }else{
      for(var i=0;i<this.genre_filter.length;i++){
        if(this.genre_filter[i]==genre){
          this.genre_filter.splice(i, 1);
          pushable = 0;
        }
      }
      if(pushable == 1){
        this.genre_filter.push(genre);
      }
    }
   
    console.log(this.genre_filter); 
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
