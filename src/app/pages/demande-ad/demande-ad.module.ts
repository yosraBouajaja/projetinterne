import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DemandeAdPageRoutingModule } from './demande-ad-routing.module';

import { DemandeAdPage } from './demande-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandeAdPageRoutingModule,
    TranslateModule
  ],
  declarations: [DemandeAdPage]
})
export class DemandeAdPageModule {}
