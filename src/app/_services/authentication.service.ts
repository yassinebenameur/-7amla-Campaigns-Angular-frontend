import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Globals} from '../_globals/Globals';
import {HttpClient} from '@angular/common/http';
import {AuthTokenModel} from '../_models/auth-token.model';
import {Router} from '@angular/router';
import {UserModel} from '../_models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  public currentUser: Observable<AuthTokenModel>;
  private currentUserSubject: BehaviorSubject<AuthTokenModel>;
  private remember;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthTokenModel>(JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthTokenModel {
    return this.currentUserSubject.value;
  }

  login(value) {
    return this.http.post<any>(Globals.API_URL + Globals.AUTH + Globals.LOGIN, value)
      .pipe(map(user => {
        if (value.remember) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject = new BehaviorSubject<AuthTokenModel>(JSON.parse(sessionStorage.getItem('currentUser')));
          this.currentUser = this.currentUserSubject.asObservable();
        }

        this.remember = value.remember;
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    console.log('logout');
    // remove user from local storage to log user out
    localStorage.getItem('currentUser') ?
      localStorage.removeItem('currentUser') :
      sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('logout 1');
    this.router.navigate(['/auth/login']);
  }


  refresh() {
    return this.http.get<UserModel>(Globals.API_URL + Globals.AUTH + Globals.REFRESH)
      .pipe(map(user => {
        let userToStore;
        let tokenUser = JSON.parse(localStorage.getItem('currentUser'));
        if (tokenUser) {
          userToStore = {token: tokenUser.token, user};
          localStorage.setItem('currentUser', JSON.stringify(userToStore));
        } else {
          tokenUser = JSON.parse(localStorage.getItem('currentUser'));
          userToStore = {token: tokenUser.token, user};
          localStorage.setItem('currentUser', JSON.stringify(userToStore));
        }
        this.currentUserSubject.next(userToStore);
      }));
  }
}
