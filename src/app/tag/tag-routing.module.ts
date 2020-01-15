import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTagComponent} from './list-tag/list-tag.component';
import {ShowTagComponent} from './show-tag/show-tag.component';


const routes: Routes = [
  {
    path: '',
    component: ListTagComponent,
  }, {
    path: ':id',
    component: ShowTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule {
}
