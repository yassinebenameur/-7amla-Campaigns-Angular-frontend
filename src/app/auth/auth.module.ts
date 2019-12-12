import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {CheckMailComponent} from './check-mail/check-mail.component';
import {VerifyComponent} from './verify/verify.component';
import {SharedModule} from "../_shared/shared.module";


@NgModule({
  declarations: [LoginComponent, RegisterComponent, CheckMailComponent, VerifyComponent],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {
}
