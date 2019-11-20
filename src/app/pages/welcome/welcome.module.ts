import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NzBreadCrumbModule, NzDatePickerModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [WelcomeRoutingModule, NzBreadCrumbModule, FormsModule, NzDatePickerModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})


export class WelcomeModule {
}
