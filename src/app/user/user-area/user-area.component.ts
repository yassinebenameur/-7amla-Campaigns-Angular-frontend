import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {AuthTokenModel} from '../../_models/auth-token.model';
import {UserModel} from '../../_models/user.model';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  display = -1;
  currentUser: AuthTokenModel;
  user: UserModel;
  private userId: any;
  private userUrl: string;

  constructor(private authService: AuthenticationService, private  crudService: CrudService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params.id;
    this.userUrl = Globals.API_URL + Globals.USER;

    this.display = 0;
    authService.refresh()
      .subscribe(() => {
        authService.currentUser
          .subscribe(
            x => {
              this.user = x.user;
            });
      });
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id'];
    });

    if (this.userId) {
      this.crudService.getOne<UserModel>(this.userUrl, this.userId)
        .subscribe(user => {
          if (this.userId !== this.user.id) {
            this.user = user;
          }
          console.log(this.user);
        });
    }
  }

  changeDisplay(i: number) {
    this.display = i;
    console.log(this.display);
  }
}
