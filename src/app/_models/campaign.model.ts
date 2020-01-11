import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';

export class Campaign {
  id: string;
  title: string;
  description: string;
  tags: Tag[];

  constructor(id: string, title: string, description: string, tags: Tag[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
  }
}
