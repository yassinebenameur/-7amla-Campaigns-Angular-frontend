import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RevertDatePipe} from '../_pipes/revert-date.pipe';
import {TruncateDescriptionPipe} from '../_pipes/truncate-description.pipe';
import {TimePipe} from '../_pipes/time.pipe';
import {ConvertDatePipe} from '../_pipes/convert-date.pipe';
import {PublicFolderPipe} from '../_pipes/public-folder.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {Select2Module} from 'ng2-select2';


@NgModule({
  declarations: [
    RevertDatePipe,
    TruncateDescriptionPipe,
    TimePipe,
    ConvertDatePipe,
    PublicFolderPipe
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
    PublicFolderPipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Select2Module
  ]
})

export class SharedModule {
}
