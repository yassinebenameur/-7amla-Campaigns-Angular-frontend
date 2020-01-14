import {Campaign} from './campaign.model';
import {ArticleModel} from './article.model';

export class UserModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  image: string;
  bio: string;
  campaigns: Campaign[];
  articles: ArticleModel[];
  interests: Campaign[];
  role?: {
    role: string;
    campaign_id: string;
  };
  feedback?: {
    comment: string,
    rating: number,
    created_at: string,
    updated_at: string
  };
  comments?: ArticleModel[];
}
