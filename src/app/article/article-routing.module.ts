import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListArticleComponent} from './list-article/list-article.component';
import {ShowArticleComponent} from './show-article/show-article.component';
import {FormArticleComponent} from './form-article/form-article.component';
import {AuthGuard} from '../_guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ListArticleComponent
  },
  {
    path: 'add/:campaign_id',
    component: FormArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: FormArticleComponent,
    canActivate: [AuthGuard]
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
