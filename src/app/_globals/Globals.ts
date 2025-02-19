import {environment} from '../../environments/environment';

export class Globals {
  static BASE_URL = environment.baseUrl;
  static API_URL = Globals.BASE_URL + '/api';
  static ARTICLE = '/article';
  static TAG = '/tag';
  static LOGIN = '/login';
  static USER = '/user';
  static REGISTER = '/register';
  static AUTH = '/auth';
  static VERIFY = '/verify';
  static REFRESH = '/refresh';

  static globalError = 'Une erreur s\'est produite. Veuillez réessayez. Si l\'erreur persiste, contactez un administrateur';
  static CAMPAIGNS = '/campaign';
  static FEEDBACK = '/feedback';
  static COMMENT = '/comment';
  static INTEREST = '/interest';
  static REMOVE = '/remove';
  static FACEBOOK_LOGIN = Globals.BASE_URL + '/redirect';
  static FUNDS = '/funds';


  static toFormData<T>(formValue: T) {
    const formData = new FormData();

    console.log('formvalue', formValue);
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      console.log('value', value);
      if (Array.isArray(value)) {
        value.forEach(val => {
          console.log(typeof val);
          if (typeof val === 'object' && !(val instanceof File)) {

            formData.append(`${key}[]`, JSON.stringify(val));

          } else {
            formData.append(`${key}[]`, val);
          }
        });
      } else {
        formData.append(key, value);
      }
    }


    return formData;
  }

}
