import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserInfo } from 'src/app/interfaces/IUserInfo';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.sass']
})
export class UserInfoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserInfo) { }


  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

}
