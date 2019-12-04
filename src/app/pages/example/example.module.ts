import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExampleRoutingModule} from './example-routing.module';
import {FormComponent} from './form/form.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';
import {ListExampleComponent} from './list-example/list-example.component';
import {SharedModule} from "../../_shared/shared.module";


@NgModule({
  declarations: [FormComponent, ListExampleComponent],
  imports: [
    SharedModule,
    ExampleRoutingModule,
  ]
})
export class ExampleModule {
}
