import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {CrudService} from "../../_services/crud.service";
import {Globals} from "../../_globals/Globals";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {

  articleForm: FormGroup;
  articleUrl


  constructor(private fb: FormBuilder, private crud: CrudService, private router: Router) {
    this.articleUrl = Globals.apiUrl + Globals.article
  }

  submitForm(value: any): void {
    for (const key in this.articleForm.controls) {
      this.articleForm.controls[key].markAsDirty();
      this.articleForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.crud.post(this.articleUrl, this.articleForm.value)
      .subscribe(() => {
        this.router.navigate(['/article'])
      })
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
    });
  }

}
