import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceuilConTabsPage } from './acceuil-con-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AcceuilConTabsPage,
    children:[
      {
        path: 'voyages-con',
        loadChildren: () => import('./../voyages-con/voyages-con.module').then( m => m.VoyagesConPageModule)
      },
    
      {
        path: 'menu-con',
        loadChildren: () => import('./../menu-con/menu-con.module').then( m => m.MenuConPageModule)
      },
      {
        path: 'historiqueVoyage',
        loadChildren: () => import('./../historique-voyage/historique-voyage.module').then( m => m.HistoriqueVoyagePageModule)
      },
      {
        path: '',
        redirectTo: '/acceuil-con-tabs/voyages-con',
        pathMatch: 'full'
      }
    ],
    
  },
  {
    path: '',
    redirectTo: '/acceuil-con-tabs/voyages-con',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceuilConTabsPageRoutingModule {}
