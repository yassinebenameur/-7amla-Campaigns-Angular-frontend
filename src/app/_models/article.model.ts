import {UserModel} from './user.model';
import {Campaign} from './campaign.model';

export class ArticleModel {
  id: string;
  title: string;
  body: string;
  user: UserModel;
  campaign: Campaign;
}
