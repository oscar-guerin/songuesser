import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NbContextMenuModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const NEBULAR: any[] = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbUserModule,
  NbContextMenuModule,
];

const COMPONENTS: any[] = [
  LayoutComponent,
  HeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...NEBULAR,
  ],
  exports: [
    ...COMPONENTS,
    ...NEBULAR
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class SharedModule {
}
