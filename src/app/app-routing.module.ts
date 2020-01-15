import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {FacebookAuthComponent} from './facebook-auth/facebook-auth.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:keyword', component: SearchComponent},
  {path: 'facebook/:token/:id', component: FacebookAuthComponent},
  {path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)},
  {path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
  {path: 'tag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
