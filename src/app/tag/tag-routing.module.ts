import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTagComponent} from './add-tag/add-tag.component';
import {ListTagComponent} from './list-tag/list-tag.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddTagComponent
  },
  {
    path: '',
    component: ListTagComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule {
}
