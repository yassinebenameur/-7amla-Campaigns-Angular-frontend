import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  registerUrl: string;
  userEmailUrl: string;

  error;

  loading: boolean;

  constructor(private crud: CrudService,
              private router: Router,
              private fb: FormBuilder) {
    this.registerUrl = Globals.API_URL + Globals.AUTH + Globals.REGISTER;

  }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({

      email: ['khlilturki97@gmail.com', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],

      first_name: ['khlil', Validators.required],
      last_name: ['turki', Validators.required],
      phone: ['54192720', Validators.required],
      date_of_birth: ['1997-03-10', Validators.required],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password_confirmation() {
    return this.registerForm.get('password_confirmation');
  }

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get date_of_birth() {
    return this.registerForm.get('date_of_birth');
  }

  // initAddress(type) {
  //   return this.fb.group({
  //     street: ['street', Validators.required],
  //     zip_code: [8000, Validators.required],
  //     country: ['tn', Validators.required],
  //     city: ['nb', Validators.required],
  //     type
  //   });
  // }


  validateEmail() {
    this.crud.getOne(this.userEmailUrl, (this.registerForm.controls.user as FormGroup).controls.email.value)
      .subscribe(() => {
        (this.registerForm.controls.user as FormGroup).controls.email.setErrors({error: true, duplicated: true});
      });
  }

  submitRegisterForm() {
    this.error = null;
    for (const key in this.registerForm.controls) {
      for (const key2 in (this.registerForm.controls[key] as FormGroup).controls) {
        (this.registerForm.controls[key] as FormGroup).controls[key2].markAsDirty();
        (this.registerForm.controls[key] as FormGroup).controls[key2].updateValueAndValidity();
      }
    }
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.crud.post(this.registerUrl, this.registerForm.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/auth/login']);
      }, () => {
        this.error = Globals.globalError;
        this.loading = false;
      });
  }

  checkPassword() {
    const password = (this.registerForm.controls.user as FormGroup).controls.password;
    const password_confirmation = (this.registerForm.controls.user as FormGroup).controls.password_confirmation;
    if (password.value && password_confirmation.value) {
      console.log(password);
      if (password.value !== password_confirmation.value) {
        password_confirmation.setErrors({error: true, confirm: true});
      }
    }
  }
}
