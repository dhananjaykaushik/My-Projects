import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BugSeverity } from 'src/app/enums/BugSeverity';
import { IBugLog } from 'src/app/interfaces/IBugLog';

@Component({
  selector: 'app-add-user-bug',
  templateUrl: './add-user-bug.component.html',
  styleUrls: ['./add-user-bug.component.sass']
})
export class AddUserBugComponent implements OnInit {

  bugLog: IBugLog = {
    bugSeverity: BugSeverity.NORMAL,
    description: '',
    logDate: new Date()
  };

  BugSeverity = BugSeverity;

  bugSeverity: string[] = [];

  bugSevFormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddUserBugComponent>) {
  }


  ngOnInit() {
    Object.keys(BugSeverity).forEach(
      bugSev => {
        if (isNaN(Number(bugSev))) {
          this.bugSeverity.push(bugSev);
        }
      }
    );
    this.bugSevFormControl.setValue(BugSeverity[this.bugSeverity[1]]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addBug() {
    this.bugLog.bugSeverity = this.bugSevFormControl.value;
    this.bugLog.logDate = new Date();
    this.dialogRef.close(this.bugLog);
  }

}
