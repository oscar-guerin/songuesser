import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CallbackComponent } from './components/callback/callback.component';
import { CoreModule } from './modules/@core/core.module';
import { SignComponent } from './components/sign/sign.component';
import { SystemModule } from './modules/@system/system.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NgxHttpRepositoryModule } from '@witty-services/ngx-http-repository';
import { NgxRepositoryModule } from '@witty-services/ngx-repository';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    SignComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SystemModule,
    NgxHttpRepositoryModule,
    NgxRepositoryModule.forRoot({
      normalizerConfiguration: {
        normalizeNull: true
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
