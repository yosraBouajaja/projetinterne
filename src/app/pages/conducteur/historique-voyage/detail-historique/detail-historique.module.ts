import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DetailHistoriquePageRoutingModule } from './detail-historique-routing.module';

import { DetailHistoriquePage } from './detail-historique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailHistoriquePageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailHistoriquePage]
})
export class DetailHistoriquePageModule {}
