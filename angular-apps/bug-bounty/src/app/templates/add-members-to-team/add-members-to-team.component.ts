import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonFunctions } from 'src/app/classes/CommonFunctions';
import { UserRole } from 'src/app/enums/UserRole';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeam } from 'src/app/interfaces/ITeam';

@Component({
  selector: 'app-add-members-to-team',
  templateUrl: './add-members-to-team.component.html',
  styleUrls: ['./add-members-to-team.component.sass']
})
export class AddMembersToTeamComponent implements OnInit {

  commonFunctions = CommonFunctions;
  userRole = UserRole;
  members = new FormControl('', [Validators.required]);

  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<AddMembersToTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITeam
  ) { }

  ngOnInit() {
  }

  showOrNot(uid: string) {
    if (this.data.teamLeads.includes(uid) || this.data.teamMembers.includes(uid)) {
      return false;
    }
    return true;
  }


  onNoClick(): void {
    this.dialogRef.close(null);
  }

}
