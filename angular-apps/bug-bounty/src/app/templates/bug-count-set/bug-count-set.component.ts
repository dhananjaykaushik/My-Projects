import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bug-count-set',
  templateUrl: './bug-count-set.component.html',
  styleUrls: ['./bug-count-set.component.sass']
})
export class BugCountSetComponent implements OnInit {

  bugCount = 0;

  constructor(
    public dialogRef: MatDialogRef<BugCountSetComponent>) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
