import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TagRoutingModule} from './tag-routing.module';
import {ListTagComponent} from './list-tag/list-tag.component';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {SharedModule} from '../_shared/shared.module';
import { ShowTagComponent } from './show-tag/show-tag.component';


@NgModule({
  declarations: [
    ListTagComponent,
    ShowTagComponent
  ],
  exports: [
    ListTagComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    NzTagModule,
    SharedModule
  ]
})
export class TagModule {
}
