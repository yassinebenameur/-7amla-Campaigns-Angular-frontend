import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormExampleRoutingModule} from './form-example-routing.module';
import {FormComponent} from './form/form.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormExampleRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class FormExampleModule {
}
