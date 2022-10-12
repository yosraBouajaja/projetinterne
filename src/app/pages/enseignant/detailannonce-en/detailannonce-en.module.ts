import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DetailannonceEnPageRoutingModule } from './detailannonce-en-routing.module';

import { DetailannonceEnPage } from './detailannonce-en.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailannonceEnPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailannonceEnPage]
})
export class DetailannonceEnPageModule {}
