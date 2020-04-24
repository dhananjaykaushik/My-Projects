import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { ITeam } from 'src/app/interfaces/ITeam';
import { take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/interfaces/IUser';
import { UserRole } from 'src/app/enums/UserRole';
import { Actions } from 'src/app/classes/Actions';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.sass']
})
export class TeamDashboardComponent implements OnInit {

  teamData: BehaviorSubject<ITeam> = new BehaviorSubject(null);
  userData: Record<string, BehaviorSubject<IUser>> = {};
  allMembers: string[];
  actions = Actions;
  userRole = UserRole;

  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    public userService: UserService,
    private authService: AuthenticationService
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
    const userIds = [...new Set([...teamData.teamMembers, ...teamData.teamLeads])];
    this.loadUserData(userIds);
    this.teamData.next(teamData);
    this.allMembers = userIds;
  }

  loadUserData(userIds: string[]) {
    this.userData = this.userService.getUsersInfo(userIds);
  }

  getRole(): UserRole {
    if (this.authService.userInfo.value && this.authService.userInfo.value.role === UserRole.ROOT) {
      return UserRole.ROOT;
    }
    if (this.teamData.value && this.teamData.value.teamLeads.includes(this.authService.userInfo.value.uid)) {
      return UserRole.TEAM_LEAD;
    }
    return UserRole.MEMBER;
  }

}
