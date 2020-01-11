import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CampaignRoutingModule} from './campaign-routing.module';
import {ListCampaignComponent} from './list-campaign/list-campaign.component';
import {AddCampaignComponent} from './add-campaign/add-campaign.component';
import {SharedModule} from '../_shared/shared.module';
import { ShowCampaignComponent } from './show-campaign/show-campaign.component';


@NgModule({
  declarations: [ListCampaignComponent, AddCampaignComponent, ShowCampaignComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    SharedModule
  ]
})
export class CampaignModule {
}