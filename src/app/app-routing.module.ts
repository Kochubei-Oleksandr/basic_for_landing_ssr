import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from '../components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
