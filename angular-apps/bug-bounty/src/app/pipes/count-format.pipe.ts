import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countFormat'
})
export class CountFormatPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return value;
  }

}
