import {Campaign} from './campaign.model';
import {ArticleModel} from './article.model';

export class UserModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  campaigns: Campaign[];
  articles: ArticleModel[];
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
  comments?: {
    content: string,
    created_at: string,
    updated_at: string
  };
}
