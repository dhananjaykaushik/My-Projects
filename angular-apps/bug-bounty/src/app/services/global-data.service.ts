import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  fullPageLoader = new BehaviorSubject<boolean>(true);

  constructor() { }
}
