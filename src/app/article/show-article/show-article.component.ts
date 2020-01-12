import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {ArticleModel} from '../../_models/article.model';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserModel} from '../../_models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {
  commentUrl;
  articleUrl: string;
  article: ArticleModel;
  articleId: string;
  currentUser: UserModel;
  commentForm: FormGroup;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private fb: FormBuilder) {
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;

    this.commentUrl = this.articleUrl + Globals.COMMENT;
    authService.currentUser
      .subscribe(user => {
        this.currentUser = user.user;
      });
  }

  ngOnInit() {
    this.articleId = this.route.snapshot.params.id;
    if (this.articleId) {
      this.crud.getOne<ArticleModel>(this.articleUrl, this.articleId)
        .subscribe(article => {
          this.article = article;
          console.log(this.article.comments[0].comments.content);
          console.log(this.articleId);

        });
    }
    this.initCommentForm();
  }

  initCommentForm() {
    this.commentForm = this.fb.group({
      content: [null, Validators.required],
      user_id: this.currentUser ? this.currentUser.id : null,
      article_id: this.articleId ? this.articleId : null
    });
  }



  postComment() {
    for (const key in this.commentForm.controls) {
      this.commentForm.controls[key].markAsDirty();
      this.commentForm.controls[key].updateValueAndValidity();
    }
    this.crud.post(this.commentUrl, this.commentForm.value)
      .subscribe(comments => {
        // @ts-ignore
        this.article.comments = comments;
      });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.commentForm.reset();
    for (const key in this.commentForm.controls) {
      this.commentForm.controls[key].markAsPristine();
      this.commentForm.controls[key].updateValueAndValidity();
    }
  }

  checkUserCanGiveComment() {
    for (const comment of this.article.comments) {
      if (comment.id === this.currentUser.id) {
        return false;
      }
    }
    return true;
  }

}
