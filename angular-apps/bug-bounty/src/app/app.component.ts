import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { TeamsService } from './services/teams.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  hello = 'aaa';
  constructor(
    private auth: AuthenticationService,
    private teams: TeamsService
  ) {}

}
