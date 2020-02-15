import { AnimesService } from './../../services/animes.service';
import { GenrelistService } from './../../services/genrelist.service';
import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, isEmpty} from 'rxjs/operators';

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
  private nbGenre = 0;
  private status_filter = 0;

  private mytitle="";
  private mystatus="";
  private request;

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
        this.CalculateScore();
      });

      
  }

  CalculateScore(){
    let total;
    for(let i=0;i<this.animes_list.length;i++){
      total = 0;
      for(let j=0;j<this.animes_list[i].scoreRelations.length;j++){
        total = total + this.animes_list[i].scoreRelations[j].score;
      }
      this.animes_list[i].score = (total/this.animes_list[i].scoreRelations.length);
    }
  }

  /*
  FilterAnime(genre) {
    this.animesService.getAnimeByFilter(genre)
    .subscribe(response=> {
      this.animes_list = response;
      console.log(this.animes_list);
    });
  }*/

  

  TestFilter(genre){
    var final_list = [];
    var inc = 0;
    var pushable = 1;

    this.animesService.getAll()
      .subscribe(response => {
        this.animes_list = response;
        
        if(this.genre_filter.length == 0){
          this.genre_filter.push("this.animes_list[k].genreLists[l].genre==");
          this.genre_filter.push('"'+genre+'"');
          this.nbGenre++;
        }else{
          for(var i=0;i<this.genre_filter.length;i++){
            if(this.genre_filter[i]=='"'+genre+'"'){
              if(i == 1){
                this.genre_filter.splice(i+1,1);
                this.genre_filter.splice(i,1);
                this.genre_filter.splice(i-1,1);
                this.nbGenre--;
              }else{
                this.genre_filter.splice(i-2, 3);
                this.nbGenre--;
              }
              pushable = 0;
            }
          }
          if(pushable == 1){
            this.genre_filter.push(" || ")
            this.genre_filter.push("this.animes_list[k].genreLists[l].genre==");
            this.genre_filter.push('"' + genre + '"');
            this.nbGenre++;
          }
        }
        var test = this.genre_filter.join('');

        if(test !=""){
          outerloop: for(var k=0;k<this.animes_list.length;k++){
            inc = 0;
            for(var l=0; l<this.animes_list[k].genreLists.length;l++){ 
              if(eval(test)){
                inc++;
              }
              if(inc == this.nbGenre){
                final_list.push(this.animes_list[k]);
                continue outerloop;
              }
            }
          }
          this.animes_list = final_list;
        }
        console.log(this.animes_list);
      });
  }


FilterAnime(title,bool_status){
  
  if(title === undefined || title === null || title == ""){
    this.mytitle = "";
  }else{
    this.mytitle = "&title="+title;
  }

  if(bool_status == 1){
    if(this.status_filter == 0){
      this.mystatus = "&status=Finished Airing";
      this.status_filter++;
    }else{
      this.mystatus = "";
      this.status_filter--;
    }
  }
  
  this.request = this.mytitle + this.mystatus;
  
  this.animesService.getAnimeByStatusOrTitle(this.request)
        .subscribe( response => {
          this.animes_list=response;
          this.CalculateScore();
      });
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
