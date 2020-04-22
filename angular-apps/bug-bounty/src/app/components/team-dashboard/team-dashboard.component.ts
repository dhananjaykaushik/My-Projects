import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { ITeam } from 'src/app/interfaces/ITeam';
import { take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.sass']
})
export class TeamDashboardComponent implements OnInit {

  teamData: BehaviorSubject<ITeam> = new BehaviorSubject(null);

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      {
        next: (params: ParamMap) => {
          const teamId = params.get('teamId');
          const teamData: ITeam = this.teamsService.routedTeam.value;
          if (teamData && teamData.tid === teamId) {
            this.populateTeamData(teamData);
          } else {
            this.teamsService.teams.subscribe(
              {
                next: (teamObservables: Observable<ITeam>[]) => {
                  teamObservables.forEach(
                    (teamObs: Observable<ITeam>) => {
                      teamObs.pipe(take(1)).subscribe(
                        (team: ITeam) => {
                          if (team && team.tid === teamId) {
                            this.populateTeamData(team);
                          }
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        }
      }
    );
  }


  populateTeamData(teamData: ITeam) {
    this.teamData.next(teamData);
  }

}
