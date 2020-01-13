import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'search/:keyword', component: SearchComponent},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
  {path: 'example', loadChildren: () => import('./pages/example/example.module').then(m => m.ExampleModule)},
  {path: 'campaign', loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)},
  {path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)},
  {path: 'tag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'user/:id', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
