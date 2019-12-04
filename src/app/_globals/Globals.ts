import {environment} from '../../environments/environment';

export class Globals {
  static baseUrl = environment.baseUrl;
  static apiUrl = Globals.baseUrl + '/api';
  static article = '/article';
 }
