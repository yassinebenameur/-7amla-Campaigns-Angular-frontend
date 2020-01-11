import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCampaignComponent} from './list-campaign/list-campaign.component';
import {AddCampaignComponent} from './add-campaign/add-campaign.component';
import {ShowCampaignComponent} from './show-campaign/show-campaign.component';


const routes: Routes = [
  {path: '', component: ListCampaignComponent},
  {path: 'add', component: AddCampaignComponent},
  {path: 'edit/:id', component: AddCampaignComponent},
  {path: ':id', component: ShowCampaignComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule {
}