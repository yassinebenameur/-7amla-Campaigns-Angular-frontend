import {NgModule} from '@angular/core';

import {UserRoutingModule} from './user-routing.module';
import {UserAreaComponent} from './user-area/user-area.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {SharedModule} from '../_shared/shared.module';
import {CampaignModule} from '../campaign/campaign.module';
import {ArticleModule} from '../article/article.module';


@NgModule({
  declarations: [UserAreaComponent, UserDetailComponent],
  imports: [
    SharedModule,
    UserRoutingModule,
    CampaignModule,
    ArticleModule
  ]
})
export class UserModule {
}
