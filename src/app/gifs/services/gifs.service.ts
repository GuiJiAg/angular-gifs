import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constants';
import { SearchGifsResponse, Datum } from '../../models/search-gifs-response';

const LIMIT_GIF_HISTORIAL: number = 10;

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _gifsHistorial: string[] = new Array();
  public responseGIPHY: Datum[] = new Array();

  constructor(
    private _http: HttpClient
  ) { 
    //Obtenemos los posibles valores almacenados en el localStorage, y lo invocamos en el constructor ya que ese solo es llamado una única vez desde que se hace la primera llamada al componente
    this._getLocalStorageHistorial();
    this._getLocalStorageGifs();
  }

  get gifsHistorial(): string[] {
    return [...this._gifsHistorial]; //Los puntos suspensivos rompe la referencia con otros componentes para evitar modificar el original del servicio
  }

  searchGifsAndAddToHistorial(gif: string = Constants.EMPTY): void { //Se obliga a que el parámetro siempre tenga un valor
    gif = gif.trim().toLocaleLowerCase();

    if (this._gifIsNotIncludedInHistorial(gif)) {
      this._gifsHistorial.unshift(gif); //Con el "unshift" se añade al principio de la lista
      this._setLocalStorageHistorial();
      this._limitGifsHistorial();
      this.searchGifs(gif);
    }
  }

  searchGifs(gif: string = Constants.EMPTY): void {
    /*
    Esta constante debe llamarse "params" ya que es el nombre del atributo que posee el objeto que se pasa
    en el segundo argumento de la parametrización del "HttpClient.get()": "options: { params?: HttpParams }"
    */
    const params: HttpParams = this._getApiGiphyParams(gif);
      
    this._http.get<SearchGifsResponse>(Constants.GIPHY_SEARCH_ENDPOINT, {params})
      .subscribe(response => {
        this.responseGIPHY = response.data;
        this.setLocalStorageGifs();
      });
  }

  private _getApiGiphyParams(gif: string): HttpParams {
    return (
      new HttpParams()
        .set(Constants.GIPHY_API_KEY_PARAM, Constants.GIPHY_API_KEY_VALUE)
        .set(Constants.GIPHY_QUERY_PARAM, gif)
        .set(Constants.GIPHY_LIMIT_PARAM, Constants.GIPHY_LIMIT_VALUE)
    );
  }

  private _gifIsNotIncludedInHistorial(gif: string): boolean {
    return !this._gifsHistorial.includes(gif);
  }

  private _limitGifsHistorial(): void {
    this._gifsHistorial = this._gifsHistorial.splice(Constants.ZERO, LIMIT_GIF_HISTORIAL);
  }

  private _getLocalStorageHistorial(): void {
    this._gifsHistorial = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_HISTORIAL)!) || new Array(); //Recordemos que el signo "!" es para evitar los estrictos de angular
  }

  private _setLocalStorageHistorial(): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_HISTORIAL, JSON.stringify(this._gifsHistorial)); //Así se guardaría una cookie llamada "historial" que contiene un objeto stringificado
  }

  private _getLocalStorageGifs(): void {
    this.responseGIPHY = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE_GIFS)!) || new Array();
  }

  private setLocalStorageGifs(): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_GIFS, JSON.stringify(this.responseGIPHY));
  }
}