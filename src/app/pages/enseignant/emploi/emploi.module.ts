import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmploiPageRoutingModule } from './emploi-routing.module';

import { EmploiPage } from './emploi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmploiPageRoutingModule,
    TranslateModule
  ],
  declarations: [EmploiPage]
})
export class EmploiPageModule {}
