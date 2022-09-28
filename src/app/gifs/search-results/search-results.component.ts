import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(
    private _gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  get gifs() {
    return this._gifsService.responseGIPHY;
  }
}
