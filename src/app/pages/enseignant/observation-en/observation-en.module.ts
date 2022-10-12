import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ObservationEnPageRoutingModule } from './observation-en-routing.module';

import { ObservationEnPage } from './observation-en.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationEnPageRoutingModule,
    TranslateModule
  ],
  declarations: [ObservationEnPage]
})
export class ObservationEnPageModule {}
