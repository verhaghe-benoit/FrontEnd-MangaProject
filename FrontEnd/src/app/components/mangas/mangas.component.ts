import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MangasService } from './../../services/mangas.service';
import { GenrelistService } from './../../services/genrelist.service';
import { Component, OnInit } from '@angular/core';
import {map, startWith, isEmpty} from 'rxjs/operators';

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.component.html',
  styleUrls: ['./mangas.component.scss']
})
export class MangasComponent implements OnInit {

  private genre_list: any;
  private mangas_list: any;
  private genre_filter = [];
  private titleManga: any;
  private nbGenre = 0;
  private status_filter = 0;

  private mytitle="";
  private mystatus="";
  private request;

  constructor(private genreListService: GenrelistService, private mangasService: MangasService) { }

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
    
      this.mangasService.getAll()
      .subscribe(response => {
        this.mangas_list = response;
        let total;
        for(let i=0;i<this.mangas_list.length;i++){
          total = 0;
          for(let j=0;j<this.mangas_list[i].scoreRelationMangas.length;j++){
            total = total + this.mangas_list[i].scoreRelationMangas[j].score;
          }
          this.mangas_list[i].score = (total/this.mangas_list[i].scoreRelationMangas.length);
        }
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
    
    this.mangasService.getMangaByStatusOrTitle(this.request)
          .subscribe( response => {
            this.mangas_list=response;
            let total;
            for(let i=0;i<this.mangas_list.length;i++){
              total = 0;
              for(let j=0;j<this.mangas_list[i].scoreRelationMangas.length;j++){
                total = total + this.mangas_list[i].scoreRelationMangas[j].score;
              }
              this.mangas_list[i].score = (total/this.mangas_list[i].scoreRelationMangas.length);
            }
        });
    }
  
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}
