import {ArticleModel} from './article.model';
import {UserModel} from './user.model';
import {TagModel} from './tag.model';


export class Campaign {
  id: string;
  title: string;
  description: string;
  articles: ArticleModel[];
  creator: UserModel;
  tags: TagModel[];
  users: UserModel[];
  feedback: UserModel[];
  interests: UserModel[];
  start_date: string;
  end_date?: string;
  start_hour: string;
  end_hour: string;
  place: string;
  image: string;

  constructor(id: string, title: string, description: string, tags: TagModel[], users: UserModel[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.users = users;
  }
}
