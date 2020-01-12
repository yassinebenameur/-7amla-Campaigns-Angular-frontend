import {Component, Input, OnInit} from '@angular/core';
import {ArticleModel} from '../../_models/article.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  @Input() articles: ArticleModel[];
  articleUrl: string;
  nbArticles: number;

  constructor(private crud: CrudService) {
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;
    this.nbArticles = 0;
  }

  ngOnInit(): void {
    if (!this.articles) {
      this.articles = [];
      this.loadData(1);
    }
  }

  loadData(pi: number = 1): void {
    this.crud.getAllPaginate<{ count: number, elements: ArticleModel[] }>(this.articleUrl, (pi - 1) * 10, 10)
      .subscribe(articles => {
        this.articles = articles.elements;
        console.log(this.articles);

        this.nbArticles = articles.count;
      });
  }

}
