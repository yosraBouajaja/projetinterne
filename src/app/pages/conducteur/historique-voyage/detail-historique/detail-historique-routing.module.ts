import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailHistoriquePage } from './detail-historique.page';

const routes: Routes = [
  {
    path: '',
    component: DetailHistoriquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailHistoriquePageRoutingModule {}
