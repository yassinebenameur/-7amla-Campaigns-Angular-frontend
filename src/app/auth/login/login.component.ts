import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Globals} from '../../_globals/Globals';
import {DOCUMENT} from '@angular/common';
import {CrudService} from '../../_services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  returnUrl: string;
  facebookAuthUrl = Globals.FACEBOOK_LOGIN;

  error;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private crud: CrudService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.initLoginForm();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/article';
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password: [null, Validators.required],
      remember: true
    });
  }

  submitLoginForm() {
    this.error = null;
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe(data => {
        console.log(data);
        this.router.navigate([this.returnUrl]);
      }, (error) => {
        this.error = 'Verify your credentials and retry ';
        this.loading = false;
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  redirectToFacebookAuth(): void {
    this.document.location.href = this.facebookAuthUrl;

  }
}
