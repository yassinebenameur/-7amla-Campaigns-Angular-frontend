import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';
import {ArticleModel} from '../../_models/article.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {

  articleUrl: string;
  article: ArticleModel;
  articleId: string

  constructor(private crud: CrudService, private route: ActivatedRoute) {
    this.articleUrl = Globals.apiUrl + Globals.article;
  }

  ngOnInit() {
    this.articleId = this.route.snapshot.params.id
    if (this.articleId)
      this.crud.getOne<ArticleModel>(this.articleUrl, this.articleId)
        .subscribe(article => {
          this.article = article;
        });
  }

}
