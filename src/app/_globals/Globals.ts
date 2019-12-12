import {environment} from '../../environments/environment';

export class Globals {
  static BASE_URL = environment.baseUrl;
  static API_URL = Globals.BASE_URL + '/api';
  static ARTICLE = '/article';
  static TAG = '/tag';
  static LOGIN = '/login';
  static USER = '/user';
  static VERIFY = '/verify';
  static REGISTER = '/register';
  static AUTH = '/auth';
  static REFRESH = '/refresh';

  static globalError = 'Une erreur s\'est produite. Veuillez réessayez. Si l\'erreur persiste, contactez un administrateur';


}
