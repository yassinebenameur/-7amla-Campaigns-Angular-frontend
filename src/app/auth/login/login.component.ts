import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Globals} from '../../_globals/Globals';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  returnUrl: string;

  error;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
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
        this.error = 'Vérifiez vos données et réessayez';
        this.loading = false;
      });
  }
}
