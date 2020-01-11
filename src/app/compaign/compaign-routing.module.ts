import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCompaignComponent} from './list-compaign/list-compaign.component';
import {AddCompaignComponent} from './add-compaign/add-compaign.component';


const routes: Routes = [
  {path: '', component: ListCompaignComponent},
  {path: 'add', component: AddCompaignComponent},
  {path: 'edit/:id', component: AddCompaignComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaignRoutingModule {
}
