import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbTooltipModule,
  NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ArtistPipe } from './pipes/artist.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CardTitleComponent } from './components/card-title/card-title.component';

const NEBULAR: any[] = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbUserModule,
  NbContextMenuModule,
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbTooltipModule
];

const COMPONENTS: any[] = [
  LayoutComponent,
  HeaderComponent,
  CardTitleComponent
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
    TranslateModule,
    ...NEBULAR,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    ...NEBULAR,
    NgSelectModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedModule {
}
