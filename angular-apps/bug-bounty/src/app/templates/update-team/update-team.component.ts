import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeam } from 'src/app/interfaces/ITeam';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.sass']
})
export class UpdateTeamComponent implements OnInit {

  teamName: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITeam) {
      this.teamName = data.teamName;
    }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

}
