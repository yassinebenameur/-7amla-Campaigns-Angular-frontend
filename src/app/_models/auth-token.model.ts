import {UserModel} from './user.model';

export class AuthTokenModel {
  token: string;
  user: UserModel;
}
