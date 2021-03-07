import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CallbackComponent } from './components/callback/callback.component';
import { CoreModule } from './modules/@core/core.module';
import { SignComponent } from './components/sign/sign.component';
import { SystemModule } from './modules/@system/system.module';
import { NgxHttpRepositoryModule } from '@witty-services/ngx-http-repository';
import { NgxRepositoryModule } from '@witty-services/ngx-repository';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbMenuModule, NbThemeModule } from '@nebular/theme';
import { SharedModule } from './modules/@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    SignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SystemModule,
    SharedModule,
    NgxHttpRepositoryModule,
    NgxRepositoryModule.forRoot({
      normalizerConfiguration: {
        normalizeNull: true
      }
    }),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbMenuModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
