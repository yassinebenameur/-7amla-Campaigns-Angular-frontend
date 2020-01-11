import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserModel} from '../../_models/user.model';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {

  articleForm: FormGroup;
  articleUrl;
  currentUser: UserModel;


  constructor(private fb: FormBuilder, private crud: CrudService, private router: Router, private authenticationService: AuthenticationService) {
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;
    this.authenticationService.currentUser
      .subscribe(user => {
        this.currentUser = user.user;
      });
  }

  submitForm(value: any): void {
    for (const key in this.articleForm.controls) {
      this.articleForm.controls[key].markAsDirty();
      this.articleForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.crud.post(this.articleUrl, this.articleForm.value)
      .subscribe(() => {
        this.router.navigate(['/article']);
      });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.articleForm.reset();
    for (const key in this.articleForm.controls) {
      this.articleForm.controls[key].markAsPristine();
      this.articleForm.controls[key].updateValueAndValidity();
    }
  }

  ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      user_id: this.currentUser.id
    });
  }

}
