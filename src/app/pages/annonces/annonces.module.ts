import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnoncesPageRoutingModule } from './annonces-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AnnoncesPage } from './annonces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnoncesPageRoutingModule,
    TranslateModule
  ],
  declarations: [AnnoncesPage]
})
export class AnnoncesPageModule {}
