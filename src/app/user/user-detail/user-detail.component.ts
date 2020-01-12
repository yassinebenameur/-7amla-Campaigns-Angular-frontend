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
  get birthDate() {
    return this.userForm.get('date_of_birth');
  }
  onChange($event: any) {
    console.log($event.getFullYear());
    const date = $event.getFullYear() + '-'
      + ('0' + ($event.getMonth() + 1)).slice(-2) + '-'
      + ('0' + $event.getDate()).slice(-2) + ' ';
      this.birthDate.setValue(date);
  }
}
