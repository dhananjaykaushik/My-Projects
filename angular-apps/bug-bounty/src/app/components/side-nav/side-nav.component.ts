import { Component, OnInit, Input } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { take } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonFunctions } from 'src/app/classes/CommonFunctions';
import { ITeam } from 'src/app/interfaces/ITeam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {

  @Input() sideNav: MatSidenav;

  commonFunctions = CommonFunctions;

  constructor(
    public auth: AuthenticationService,
    public teamsService: TeamsService
  ) { }

  ngOnInit() {

  }

  routedTeam(team: ITeam) {
    this.teamsService.routedTeam.next(team);
  }

}
