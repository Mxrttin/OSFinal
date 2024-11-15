import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarcategoriaPage } from './agregarcategoria.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarcategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarcategoriaPageRoutingModule {}
