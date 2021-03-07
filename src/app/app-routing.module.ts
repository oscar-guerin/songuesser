import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './components/callback/callback.component';
import { SignComponent } from './components/sign/sign.component';
import { HomeModule } from './modules/home/home.module';
import { AuthGuard } from './modules/@system/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: (): Promise<HomeModule> => import('./modules/home/home.module').then((value: { HomeModule: HomeModule }) => value.HomeModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
      },
    ]
  },
  {
    path: 'sign',
    component: SignComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '**',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }