import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AjoutVoyagePageRoutingModule } from './ajout-voyage-routing.module';

import { AjoutVoyagePage } from './ajout-voyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutVoyagePageRoutingModule,
    TranslateModule
  ],
  declarations: [AjoutVoyagePage]
})
export class AjoutVoyagePageModule {}
