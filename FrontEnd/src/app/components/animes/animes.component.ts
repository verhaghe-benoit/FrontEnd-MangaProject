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
  private titleAnime: any;
  

  constructor( private genreListService: GenrelistService, private animesService: AnimesService ) {}

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    let total;
    
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
        let total;

        
        for(let i=0;i<this.animes_list.length;i++){
          total = 0;
          for(let j=0;j<this.animes_list[i].scoreRelations.length;j++){
            total = total + this.animes_list[i].scoreRelations[j].score;
          }
          this.animes_list[i].score = (total/this.animes_list[i].scoreRelations.length);
        }
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

 FilterTitle(title){
  this.animesService.getAnimeByTitle(title)
      .subscribe(response => {
        this.animes_list = response;
      });
 }

  FilterAnime(genre){
    var pushable = 1;
    if(this.genre_filter.length == 0){
      this.genre_filter.push("&genreLists.genre=");
      this.genre_filter.push(genre);
    }else{
      for(var i=0;i<this.genre_filter.length;i++){
        if(this.genre_filter[i]==genre){
          this.genre_filter.splice(i, 1);
          this.genre_filter.splice(i-1, 1);
          pushable = 0;
        }
      }
      if(pushable == 1){
        this.genre_filter.push("&genreLists.genre=");
        this.genre_filter.push(genre);
      }
    }
    var test = this.genre_filter.join('');
    this.animesService.getAnimeByFilter(test)
      .subscribe(response => {
        this.animes_list = response;
      });
    //console.log(this.genre_filter); 
    console.log(test);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
