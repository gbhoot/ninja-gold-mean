import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { create } from 'domain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ninja Gold';
  gid: string = "";
  gold_total: number = 0;
  logs: string[] = [];

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.loadGame();
  }

  loadGame() {
    let observable = this._httpService.loadGame();
    observable.subscribe(data => {
      if (data['message'] == "Success") {
        let game = data['game'];
        console.log(game);
        this.gid = game[0]['_id'];
        this.gold_total = game[0]['gold'];
        this.logs = game[0]['activities'];
      } else {
        console.log("About to create");
        this.createGame();
      }
    });
  }

  createGame() {
    let observable = this._httpService.createGame();
    observable.subscribe(data => {
      let game = data['game'];
      this.gid = game['_id'];
      this.gold_total = 0;
      this.logs = [];
    });
  }

  placeBtnPressed(place: string) {
    let observable = this._httpService.visitLocale(place);
    observable.subscribe(data => {
      console.log(data);
      let game = data['game'];
      this.gid = game[0]['_id'];
      this.gold_total = game[0]['gold'];
      this.logs = game[0]['activities'];
      console.log(this.gold_total, this.logs);
    })
  }
}
