import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { IComponentLoad } from '../interfaces/IComponentLoad';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  fullPageLoader = new BehaviorSubject<boolean>(true);
  modalEmitter = new BehaviorSubject<IComponentLoad>(null);

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string, time?: number) {
    this.snackBar.open(message, null, {
      duration: time ? time : 2000
    });
  }

}
