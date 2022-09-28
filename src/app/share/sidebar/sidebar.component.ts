import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  constructor(
    private _gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  get gifsHistorial(): string[] {
    return this._gifsService.gifsHistorial;
  }

  searchGifs(gif: string): void {
    this._gifsService.searchGifs(gif);
  }
}
