import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intials'
})
export class IntialsPipe implements PipeTransform {

  transform(value: string): string {
    const parts = value.split(' ');
    const intialStr = parts[0][0] + parts[parts.length - 1][0];
    return intialStr;
  }

}
