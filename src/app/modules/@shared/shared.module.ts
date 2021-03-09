import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbInputModule, NbLayoutModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ArtistPipe } from './pipes/artist.pipe';

const NEBULAR: any[] = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbUserModule,
  NbContextMenuModule,
  NbInputModule,
  NbButtonModule,
  NbCardModule
];

const COMPONENTS: any[] = [
  LayoutComponent,
  HeaderComponent
];

const PIPES: any[] = [
  ArtistPipe
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
    ...PIPES,
    ...NEBULAR,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedModule {
}
