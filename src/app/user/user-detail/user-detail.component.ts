import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../_models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {AuthTokenModel} from '../../_models/auth-token.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userForm: FormGroup;
  @Input() user: UserModel;
  userForForm: AuthTokenModel;
  date_of_birth: Date;

  edit: boolean;
  loading: boolean;

  userUrl: string;

  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private authService: AuthenticationService) {
    this.edit = false;
    this.userUrl = Globals.API_URL + Globals.USER;
    authService.currentUser
      .subscribe(user => {
        this.userForForm = user;
        console.log(this.userForForm);
        if (this.userForForm) {
          this.initUserForm();
          const date_of_birth = this.userForForm.user.date_of_birth.split('-');
          this.date_of_birth = new Date();
          this.date_of_birth.setDate(parseInt(date_of_birth[2], 10));
          this.date_of_birth.setMonth(parseInt(date_of_birth[1], 10) - 1);
          this.date_of_birth.setFullYear(parseInt(date_of_birth[0], 10));
        }
      });
  }

  preventDefault($e: MouseEvent) {
    $e.preventDefault();
  }

  ngOnInit() {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      first_name: [this.user ? this.userForForm.user.first_name : null, Validators.required],
      last_name: [this.user ? this.userForForm.user.last_name : null, Validators.required],
      phone: [this.user ? this.userForForm.user.phone : null, Validators.required],
      date_of_birth: [this.user ? this.userForForm.user.date_of_birth : null, Validators.required],
    });
  }


  // initAddress(type) {
  //   return this.fb.group({
  //     street: [type !== 'billing' ? (this.user ? this.userForForm.user.user_detail.address.street : null) : null, Validators.required],
  //     zip_code: [type !== 'billing' ? (this.user ? this.userForForm.user.user_detail.address.zip_code : null) : null, Validators.required],
  //     country: [type !== 'billing' ? (this.user ? this.userForForm.user.user_detail.address.country : null) : null, Validators.required],
  //     city: [type !== 'billing' ? (this.user ? this.userForForm.user.user_detail.address.city : null) : null, Validators.required],
  //     type
  //   });
  // }

  editUser() {
    for (const key in this.userForm.controls) {
      this.userForm.controls[key].markAsDirty();
      this.userForm.controls[key].updateValueAndValidity();

    }

    this.userForm.controls.date_of_birth.setValue(
      this.date_of_birth.getFullYear() + '-' + (this.date_of_birth.getMonth() + 1) + '-' + this.date_of_birth.getDate()
    );

    this.crud.update(this.userUrl, this.user.id, this.userForm.value)
      .subscribe(data => {
        this.loading = true;
        console.log(data);
        this.authService.refresh()
          .subscribe(() => {
            this.edit = !this.edit;
            this.loading = false;
          });
      });
  }
}
