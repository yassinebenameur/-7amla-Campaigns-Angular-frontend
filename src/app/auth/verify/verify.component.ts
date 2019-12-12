import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  verifyUrl;

  verifyForm: FormGroup;

  token: string;

  error;
  sendPassword: boolean;

  loading: boolean;

  constructor(private crud: CrudService, private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
    this.verifyUrl = Globals.API_URL + Globals.USER + Globals.VERIFY;
  }

  ngOnInit() {
    this.token = this.route.snapshot.params.token;
    if (!this.token) {
      history.back();
      return;
    }
    this.initVerifyForm();
    this.verifyUser();
  }

  initVerifyForm() {
    this.verifyForm = this.fb.group({
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
    });
  }

  verifyUser() {
    this.error = null;
    this.loading = true;
    this.crud.post(this.verifyUrl, Object.assign({token: this.token}, this.verifyForm.value.password ? this.verifyForm.value : null))
      .subscribe(data => {
        console.log(data);
        if (Object.keys(data).length > 0) {
          this.sendPassword = true;
          this.loading = false;
          return;
        }
        this.router.navigate(['/auth/login']);
      }, () => {
        this.error = Globals.globalError;
        this.loading = false;
      });
  }

}
