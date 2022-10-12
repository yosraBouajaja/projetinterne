import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ExcerciceEnAjoutPageRoutingModule } from './excercice-en-ajout-routing.module';

import { ExcerciceEnAjoutPage } from './excercice-en-ajout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcerciceEnAjoutPageRoutingModule,
    TranslateModule
  ],
  declarations: [ExcerciceEnAjoutPage]
})
export class ExcerciceEnAjoutPageModule {}
