import {Campaign} from './campaign.model';

export class TagModel {
  id: string;
  name: string;
  campaigns: Campaign[];

  constructor(name: string) {
    this.name = name;

  }


}
