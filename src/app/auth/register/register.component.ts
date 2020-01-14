import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  registerUrl: string;
  userEmailUrl: string;

  validateEmailSubscription: Subscription;

  error;

  loading: boolean;

  constructor(private crud: CrudService,
              private router: Router,
              private fb: FormBuilder) {
    this.registerUrl = Globals.API_URL + Globals.AUTH + Globals.REGISTER;
    this.userEmailUrl = Globals.API_URL + Globals.USER + Globals.VERIFY;
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

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({

      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],

      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      date_of_birth: ['', Validators.required],
    });
  }

  validateEmail() {
    if (this.validateEmailSubscription) {
      this.validateEmailSubscription.unsubscribe();
    }
    this.validateEmailSubscription = this.crud.getOne(this.userEmailUrl, this.registerForm.controls.email.value)
      .subscribe(() => {
        },
        () => {
          this.registerForm.controls.email.setErrors({error: true, duplicated: true});
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

}
