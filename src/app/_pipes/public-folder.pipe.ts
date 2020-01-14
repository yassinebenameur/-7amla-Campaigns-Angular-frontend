import {Pipe, PipeTransform} from '@angular/core';
import {Globals} from '../_globals/Globals';

@Pipe({
  name: 'publicFolder'
})
export class PublicFolderPipe implements PipeTransform {

  transform(filePath: string): any {
    if (filePath.indexOf('facebook') > 0) {
      return filePath;
    }
    return Globals.BASE_URL + '/' + filePath;
  }

}
