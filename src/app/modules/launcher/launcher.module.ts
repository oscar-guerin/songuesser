import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LauncherRoutingModule } from './launcher-routing.module';
import { LauncherComponent } from './launcher.component';
import { SeedSearchComponent } from './seed-search/seed-search.component';
import { SharedModule } from '../@shared/shared.module';

const COMPONENTS: any[] = [
  LauncherComponent,
  SeedSearchComponent
];

@NgModule({
  imports: [
    CommonModule,
    LauncherRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    ...COMPONENTS
  ],
  providers: [],
})
export class LauncherModule {
}
