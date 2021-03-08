import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../@shared/shared.module';

const COMPONENTS: any[] = [
  HomeComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [
    ...COMPONENTS
  ],
  providers: [],
})
export class HomeModule {
}
