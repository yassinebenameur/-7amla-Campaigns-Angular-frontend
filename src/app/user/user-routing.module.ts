import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAreaComponent} from './user-area/user-area.component';


const routes: Routes = [
  {
    path: '',
    component: UserAreaComponent
  },
  {
    path: ':id',
    component: UserAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
