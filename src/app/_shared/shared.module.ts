import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RevertDatePipe} from "../_pipes/revert-date.pipe";


@NgModule({
  declarations: [RevertDatePipe],
  imports: [
  ],
  providers: [],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    RevertDatePipe,
  ]
})

export class SharedModule {
}
