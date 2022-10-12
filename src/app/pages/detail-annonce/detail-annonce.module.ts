import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { DetailAnnoncePageRoutingModule } from './detail-annonce-routing.module';

import { DetailAnnoncePage } from './detail-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAnnoncePageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailAnnoncePage]
})
export class DetailAnnoncePageModule {}
