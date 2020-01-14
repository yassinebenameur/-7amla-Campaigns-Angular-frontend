import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-facebook-auth',
  templateUrl: './facebook-auth.component.html',
  styleUrls: ['./facebook-auth.component.css']
})
export class FacebookAuthComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    const token = this.route.snapshot.params.token;
    localStorage.setItem('currentUser', JSON.stringify({token, user: null}));
    this.authenticationService.currentUserSubject.next({token, user: null});
    this.authenticationService.refresh()
      .subscribe(() => {
        this.router.navigate(['/campaign']);
      });

    console.log('TEST');
  }

}
