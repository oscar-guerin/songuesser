import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NbButtonModule, NbContextMenuModule, NbInputModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

const NEBULAR: any[] = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbUserModule,
  NbContextMenuModule,
  NbInputModule,
  NbButtonModule
];

const COMPONENTS: any[] = [
  LayoutComponent,
  HeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    FormsModule,
    ...NEBULAR,
  ],
  exports: [
    ...COMPONENTS,
    ...NEBULAR,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class SharedModule {
}
