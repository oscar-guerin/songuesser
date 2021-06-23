import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AboutRoutingModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule {
}
