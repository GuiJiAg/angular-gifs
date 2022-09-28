import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(
    private _gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  search(): void {
    if (this._searchInputIsNotEmpty()) {
      let value = this.txtSearch.nativeElement.value;
      this._gifsService.searchGifsAndAddToHistorial(value);

      this._cleanInputs();
    }
  }

  private _searchInputIsNotEmpty(): boolean {
    let lengthOfValueInputSearch: number = this.txtSearch.nativeElement.value.trim().length;

    return lengthOfValueInputSearch > Constants.ZERO;
  }

  private _cleanInputs(): void {
    this.txtSearch.nativeElement.value = Constants.EMPTY;
  }
}
