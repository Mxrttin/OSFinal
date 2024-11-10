import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfousuarioPage } from './infousuario.page';

const routes: Routes = [
  {
    path: '',
    component: InfousuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfousuarioPageRoutingModule {}
