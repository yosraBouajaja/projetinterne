import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailDevoirPageRoutingModule } from './detail-devoir-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DetailDevoirPage } from './detail-devoir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailDevoirPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailDevoirPage]
})
export class DetailDevoirPageModule {}
