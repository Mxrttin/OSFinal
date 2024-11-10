import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminprincipalPage } from './adminprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: AdminprincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminprincipalPageRoutingModule {}
