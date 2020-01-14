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
  page = 1;
  loading: any;

  constructor(private crud: CrudService) {
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;
    this.nbArticles = 0;
  }

  ngOnInit(): void {
    if (!this.articles) {
      this.articles = [];
      this.loadData(this.page);
    }
  }

  loadData(pi: number = 1): void {
    this.loading = true;
    this.crud.getAllPaginate<{ count: number, elements: ArticleModel[] }>(this.articleUrl, (pi - 1) * 6, 6)
      .subscribe(articles => {
        this.articles = this.articles.concat(articles.elements);
        console.log(this.articles);

        this.loading = false;
        this.nbArticles = articles.count;
      });
  }

  preventDefault($e) {
    $e.preventDefault();
  }

}
