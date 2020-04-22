import { Component, OnInit, Input } from '@angular/core';
import { CommonFunctions } from 'src/app/classes/CommonFunctions';
import { UserService } from 'src/app/services/user.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { UserRole } from 'src/app/enums/UserRole';
import { ITeam } from 'src/app/interfaces/ITeam';
import { TeamsService } from 'src/app/services/teams.service';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { IUserBugInfo } from 'src/app/interfaces/IUserBugInfo';

@Component({
  selector: 'app-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.sass']
})
export class CreateTeamFormComponent implements OnInit {

  commonFunctions = CommonFunctions;
  teamId: string;
  userRole = UserRole;

  teamName = new FormControl('', [Validators.required]);
  teamLeader = new FormControl('', [Validators.required]);
  teamMembers = new FormControl('', [Validators.required]);

  constructor(
    public userService: UserService,
    private teamService: TeamsService,
    private globalService: GlobalDataService
  ) { }

  ngOnInit() {
    this.teamId = CommonFunctions.generateUniqueKey(16);
  }

  createTeam(form: NgForm) {

    if ((!this.teamName.invalid) && (!this.teamLeader.invalid) && (!this.teamMembers.invalid)) {
      const bugInfo: Record<string, IUserBugInfo> = {};
      this.teamMembers.value.forEach(
        uid => {
          const bugData: IUserBugInfo = {
            bugCounter: 0,
            logTracker: []
          };
          bugInfo[uid] = bugData;
        }
      );
      this.teamLeader.value.forEach(
        uid => {
          const bugData: IUserBugInfo = {
            bugCounter: 0,
            logTracker: []
          };
          bugInfo[uid] = bugData;
        }
      );
      const newTeamData: ITeam = {
        tid: this.teamId,
        teamName: this.teamName.value,
        teamLeads: this.teamLeader.value,
        teamMembers: this.teamMembers.value,
        userBugInfo: bugInfo
      };
      this.teamService.createTeam(newTeamData);
      this.userService.addUsersToTeam([...new Set([...this.teamLeader.value, ...this.teamMembers.value])], this.teamId);
      this.globalService.showSnackbar(`Team ${this.teamName.value} created successfully!`);
      this.globalService.modalEmitter.next({
        componentToRender: null,
        open: false
      });
    }
  }

}
