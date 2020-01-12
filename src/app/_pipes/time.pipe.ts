import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: string): any {
    if (time) {
      let newTime: string;
      newTime = time.split(':')[0] + ':' + time.split(':')[1];
      return newTime;
    }
    return time;
  }

}
