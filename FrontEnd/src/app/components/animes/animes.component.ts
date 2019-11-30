import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from 'src/app/animations';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-animes',
  templateUrl: './animes.component.html',
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./animes.component.scss']
})
export class AnimesComponent implements OnInit {

  constructor() { }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
