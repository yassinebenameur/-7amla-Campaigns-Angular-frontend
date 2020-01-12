import {Pipe, PipeTransform} from '@angular/core';
import {Globals} from '../_globals/Globals';

@Pipe({
  name: 'publicFolder'
})
export class PublicFolderPipe implements PipeTransform {

  transform(filePath: string): any {
    return Globals.BASE_URL + '/' + filePath;
  }

}
