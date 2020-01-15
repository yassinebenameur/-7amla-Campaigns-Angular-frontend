import {Component, OnInit} from '@angular/core';
import {ArticleModel} from '../_models/article.model';
import {CrudService} from '../_services/crud.service';
import {Globals} from '../_globals/Globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: ArticleModel[];
  articleUrl;

  constructor(private crud: CrudService) {
    this.articleUrl = Globals.API_URL + Globals.ARTICLE;
  }

  ngOnInit() {
    this.crud.getAllPaginate<{ elements: ArticleModel[] }>(this.articleUrl, 1, 3)
      .subscribe(articles => {
        this.articles = articles.elements;
      });
  }

}
