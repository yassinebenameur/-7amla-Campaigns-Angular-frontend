import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncateDescription'
})
export class TruncateDescriptionPipe implements PipeTransform {

  transform(description: string, length?: number): any {
    return length ?
      (description.length > length ? description.substr(0, length) + '...' : description)
      : (description.length > 100 ? description.substr(0, 100) + '...' : description);
  }

}
