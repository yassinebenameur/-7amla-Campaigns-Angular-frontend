import {Component, OnInit} from '@angular/core';
import {ArticleModel} from '../../_models/article.model';
import {CrudService} from '../../_services/crud.service';
import {Globals} from '../../_globals/Globals';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  articles: ArticleModel[];
  articleUrl: string;
  nbArticles: number;

  constructor(private crud: CrudService) {
    this.articles = [];
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;
    this.nbArticles = 0;
  }

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pi: number = 1): void {
    this.crud.getAllPaginate<{ count: number, elements: ArticleModel[] }>(this.articleUrl, pi - 1, 10)
      .subscribe(articles => {
        this.articles = articles.elements;
        this.nbArticles = articles.count;
      });
  }

}
