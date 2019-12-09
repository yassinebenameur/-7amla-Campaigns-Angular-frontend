import {environment} from '../../environments/environment';

export class Globals {
  static BASE_URL = environment.baseUrl;
  static API_URL = Globals.BASE_URL + '/api';
  static ARTICLE = '/article';
  static TAG = '/tag';
 }
