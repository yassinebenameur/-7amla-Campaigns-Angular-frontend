import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {AuthTokenModel} from '../../_models/auth-token.model';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  display: number;
  user: AuthTokenModel;

  constructor(private authService: AuthenticationService) {
    this.display = 0;
    authService.refresh()
      .subscribe(() => {
        authService.currentUser
          .subscribe(
            x => {
              this.user = x;
              console.log(this.user);
            });
      });
  }

  ngOnInit() {
  }

  changeDisplay(i: number) {
    this.display = i;
    console.log(this.display);
  }
}
