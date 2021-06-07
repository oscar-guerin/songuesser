import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LauncherRoutingModule } from './launcher-routing.module';
import { LauncherComponent } from './launcher.component';
import { SeedSearchComponent } from './seed-search/seed-search.component';
import { SharedModule } from '../@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS: any[] = [
  LauncherComponent,
  SeedSearchComponent
];

@NgModule({
  imports: [
    CommonModule,
    LauncherRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    ...COMPONENTS
  ],
  providers: [],
})
export class LauncherModule {
}
