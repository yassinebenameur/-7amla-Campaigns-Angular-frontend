import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user_name = null;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.currentUserSubject.subscribe(
      (data) => {
        if (data && data.user) {
          this.user_name = data.user.first_name + ' ' + data.user.last_name;
        } else {
          this.user_name = null;
        }

      }
    );
  }


  onEnter(value: any) {
    console.log(value);
    this.router.navigateByUrl('search/' + value);
  }

  logout() {
    this.authenticationService.logout();
  }
}
