import {UserModel} from './user.model';
import {Campaign} from './campaign.model';

export class ArticleModel {
  id: string;
  title: string;
  body: string;
  image: string;
  user: UserModel;
  campaign: Campaign;
  comments: UserModel[] | {
    content: string,
    created_at: string,
    updated_at: string
  }[];

}
