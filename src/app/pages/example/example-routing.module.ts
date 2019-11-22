import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './form/form.component';
import {ListExampleComponent} from './list-example/list-example.component';


const routes: Routes = [
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'list',
    component: ListExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule {
}
