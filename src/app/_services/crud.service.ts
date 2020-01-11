import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../_globals/Globals';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
  }

  getAll<T>(url) {
    return this.http.get<T>(url);
  }

  getAllPaginate<T>(url, offset, limit) {
    return this.http.get<T>(url + '?offset=' + offset + '&limit=' + limit);
  }

  search<T>(url, key) {
    return this.http.get<T>(url + '/search' + '?key=' + key);
  }

  searchPaginate<T>(url, key, offset, limit) {
    return this.http.get<T>(url + '/search' + '?key=' + key + '&offset=' + offset + '&limit=' + limit);
  }

  getOne<T>(url, id) {
    return this.http.get<T>(url + '/' + id);
  }

  post(url, values, toFormData = false) {
    if (toFormData) {
      return this.http.post(url, Globals.toFormData(values));
    }
    return this.http.post(url, values);
  }

  update(url, id, values, toFormData = false) {
    if (toFormData) {
      return this.http.post(url + '/' + id, Globals.toFormData(Object.assign(values, {_method: 'put'})));
    }
    return this.http.put(url + '/' + id, values);
  }

  delete(url, id) {
    return this.http.delete(url + '/' + id);
  }


}
