import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'production', component: AppComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: ''}]
})
export class AppRoutingModule { }
