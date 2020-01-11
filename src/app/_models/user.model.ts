export class UserModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
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
}
