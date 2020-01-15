import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IconsProviderModule} from './icons-provider.module';
import {en_US, NZ_I18N} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {SearchComponent} from './search/search.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import {FacebookAuthComponent} from './facebook-auth/facebook-auth.component';
import {HomeComponent} from './home/home.component';
import {CampaignModule} from './campaign/campaign.module';
import {ArticleModule} from './article/article.module';
import {TagModule} from './tag/tag.module';
import {SharedModule} from './_shared/shared.module';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    FacebookAuthComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CampaignModule,
    ArticleModule,
    TagModule,
    SharedModule
  ],
  providers: [

    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: NZ_I18N, useValue: en_US},

    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},

    // {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
