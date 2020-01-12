import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RevertDatePipe} from '../_pipes/revert-date.pipe';
import {TruncateDescriptionPipe} from '../_pipes/truncate-description.pipe';
import {TimePipe} from '../_pipes/time.pipe';
import {ConvertDatePipe} from '../_pipes/convert-date.pipe';


@NgModule({
  declarations: [
    RevertDatePipe,
    TruncateDescriptionPipe,
    TimePipe,
    ConvertDatePipe
  ],
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
    TruncateDescriptionPipe,
    TimePipe,
    ConvertDatePipe,
  ]
})

export class SharedModule {
}
