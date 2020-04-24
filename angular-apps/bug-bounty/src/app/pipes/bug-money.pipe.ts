import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bugMoney'
})
export class BugMoneyPipe implements PipeTransform {

  /*
  *
  * First 10 bugs : 5Rs each
  * After 10 bugs : 10Rs each
  *
  */

  transform(bugs: number): number {
    let money = 0;
    if (bugs <= 10) {
      money = (bugs * 5);
    } else {
      money = 50 + ((bugs - 10) * 10 );
    }
    return money;
  }

}
