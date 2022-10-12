import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriqueVoyagePage } from './historique-voyage.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueVoyagePage
  },
  {
    path: 'detail-historique',
    loadChildren: () => import('./detail-historique/detail-historique.module').then( m => m.DetailHistoriquePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriqueVoyagePageRoutingModule {}
