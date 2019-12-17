import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompaignRoutingModule} from './compaign-routing.module';
import {ListCompaignComponent} from './list-compaign/list-compaign.component';
import {AddCompaignComponent} from './add-compaign/add-compaign.component';
import {SharedModule} from '../_shared/shared.module';


@NgModule({
  declarations: [ListCompaignComponent, AddCompaignComponent],
  imports: [
    CommonModule,
    CompaignRoutingModule,
    SharedModule
  ]
})
export class CompaignModule {
}
