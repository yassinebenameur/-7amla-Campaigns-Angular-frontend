import {ArticleModel} from './article.model';
import {UserModel} from './user.model';

export class Campaign {
  id: string;
  title: string;
  description: string;
  articles: ArticleModel[];
  creator: UserModel;

  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
