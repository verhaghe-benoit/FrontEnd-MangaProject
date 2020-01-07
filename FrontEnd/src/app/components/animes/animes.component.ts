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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
