import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCompaignComponent} from './list-compaign/list-compaign.component';
import {AddCompaignComponent} from './add-compaign/add-compaign.component';


const routes: Routes = [
  {path: 'list', component: ListCompaignComponent},
  {path: 'add', component: AddCompaignComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaignRoutingModule {
}
