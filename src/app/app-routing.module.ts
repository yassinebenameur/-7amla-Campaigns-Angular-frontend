import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'search/:keyword', component: SearchComponent},
  {path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)},
  {path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
  {path: 'tag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
