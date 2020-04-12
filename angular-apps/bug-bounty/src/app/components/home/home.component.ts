import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TeamsService } from 'src/app/services/teams.service';

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
    this.teamsService.getTeams();
  }

}
