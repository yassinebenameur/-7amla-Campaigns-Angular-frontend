import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'revertDate'
})
export class RevertDatePipe implements PipeTransform {

  transform(date: string): any {
    const attributes = date.split('-');
    return attributes[2] + '-' + attributes[1] + '-' + attributes[0];
  }

}
