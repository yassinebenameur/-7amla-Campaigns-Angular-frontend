import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {ArticleModel} from '../../_models/article.model';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserModel} from '../../_models/user.model';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {

  articleUrl: string;
  article: ArticleModel;
  articleId: string;
  currentUser: UserModel;

  constructor(private crud: CrudService,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;
    authService.currentUser
      .subscribe(user => {
        if (user) {
          this.currentUser = user.user;
        }
      });
  }

  ngOnInit() {
    this.articleId = this.route.snapshot.params.id;
    if (this.articleId) {
      this.crud.getOne<ArticleModel>(this.articleUrl, this.articleId)
        .subscribe(article => {
          this.article = article;
        });
    }
  }

}
