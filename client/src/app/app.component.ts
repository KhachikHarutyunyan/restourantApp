import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  // https://themeforest.net/item/soup-restaurant-with-online-ordering-system-template/19719445?s_rank=32&_ga=2.99811806.1505492418.1531838649-1378379996.1531590005

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth token');

    console.log(potentialToken);

    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
  }
}
