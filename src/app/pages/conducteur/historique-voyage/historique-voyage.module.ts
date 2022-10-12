import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriqueVoyagePageRoutingModule } from './historique-voyage-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { HistoriqueVoyagePage } from './historique-voyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriqueVoyagePageRoutingModule,TranslateModule
  ],
  declarations: [HistoriqueVoyagePage]
})
export class HistoriqueVoyagePageModule {}
