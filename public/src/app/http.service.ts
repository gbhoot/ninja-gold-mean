import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getGames() {
    return this._http.get('/getGames');
  };

  visitLocale(locale: string) {
    return this._http.get('/visit/'+ locale);
  };

  createGame() {
    return this._http.get('/newGame');
  };

  loadGame() {
    return this._http.get('/loadGame');
  };  
}
