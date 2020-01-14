import {NgModule} from '@angular/core';

import {ArticleRoutingModule} from './article-routing.module';
import {ListArticleComponent} from './list-article/list-article.component';
import {SharedModule} from '../_shared/shared.module';
import {ShowArticleComponent} from './show-article/show-article.component';
import {FormArticleComponent} from './form-article/form-article.component';


@NgModule({
  declarations: [ListArticleComponent, ShowArticleComponent, FormArticleComponent],
  exports: [
    ListArticleComponent,
    FormArticleComponent
  ],
  imports: [
    SharedModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule {
}
