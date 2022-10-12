import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { InfoVoyagePageRoutingModule } from './info-voyage-routing.module';

import { InfoVoyagePage } from './info-voyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoVoyagePageRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [InfoVoyagePage]
})
export class InfoVoyagePageModule {}
