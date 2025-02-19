import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserModel} from '../../_models/user.model';
import {ArticleModel} from '../../_models/article.model';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {

  articleForm: FormGroup;
  articleUrl;
  articleId;
  currentUser: UserModel;
  campaignId: string;
  article: ArticleModel;
  loading: boolean;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private readonly returnUrl: string;

  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;
    this.authenticationService.currentUser
      .subscribe(user => {
        if (user) {
          this.currentUser = user.user;
        }
      });
    route.params.subscribe(params => {
      this.campaignId = params.campaign_id;
      this.articleId = params.id;
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/article';

  }

  get title() {
    return this.articleForm.get('title');
  }

  get body() {
    return this.articleForm.get('body');
  }

  ngOnInit() {
    this.initForm();
    if (this.articleId) {
      this.crud.getOne<ArticleModel>(this.articleUrl, this.articleId)
        .subscribe(article => {
          this.article = article;
          this.initForm();
        }, () => {
          this.router.navigate(['/article']);
        });
    }
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  submitForm(value: any): void {
    for (const key in this.articleForm.controls) {
      this.articleForm.controls[key].markAsDirty();
      this.articleForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    this.loading = true;
    if (!this.article) {
      this.crud.post(this.articleUrl, this.articleForm.value, true)
        .subscribe(() => {
          history.back();
          this.loading = false;
        });
    } else {
      this.crud.update(this.articleUrl, this.articleId, this.articleForm.value, true)
        .subscribe(() => {
          history.back();
          this.loading = false;
        });
    }
  }


  initForm() {
    this.articleForm = this.fb.group({
      title: [this.article ? this.article.title : '', [Validators.required]],
      body: [this.article ? this.article.body : '', [Validators.required]],
      user_id: this.article ? this.article.user.id : this.currentUser.id,
      campaign_id: this.campaignId ? this.campaignId : (this.article ? this.article.campaign.id : null)
    });
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

}
