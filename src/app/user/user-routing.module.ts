import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAreaComponent} from './user-area/user-area.component';
import {AuthGuard} from '../_guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: UserAreaComponent,
    canActivate: [AuthGuard]
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
