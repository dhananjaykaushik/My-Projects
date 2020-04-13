import { Injectable, Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NgClass } from '@angular/common';
import { IComponentLoad } from '../interfaces/IComponentLoad';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  fullPageLoader = new BehaviorSubject<boolean>(true);
  modalEmitter = new BehaviorSubject<IComponentLoad>(null);

  constructor() { }
}
