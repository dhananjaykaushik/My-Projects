import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';

@Pipe({
  name: 'bugLog'
})
export class BugLogPipe implements PipeTransform {

  transform(value: Map<string, ITeam>) {
    const arr: ITeam[] = [];
    value.forEach(
      val => {
        arr.push(val);
      }
    );
    return arr;
  }

}
