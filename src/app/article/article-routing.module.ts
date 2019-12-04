import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListArticleComponent} from "./list-article/list-article.component";
import {ShowArticleComponent} from "./show-article/show-article.component";


const routes: Routes = [
  {
    path: '',
    component: ListArticleComponent
  },
  {
    path: ':id',
    component: ShowArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
