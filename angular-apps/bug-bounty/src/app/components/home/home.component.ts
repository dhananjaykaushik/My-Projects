import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TeamsService } from 'src/app/services/teams.service';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth: AuthenticationService,
    private teamsService: TeamsService
  ) { }

  ngOnInit() {
    if (this.auth.loggedIn.value) {
      this.teamsService.getTeams();
    }
  }

}
