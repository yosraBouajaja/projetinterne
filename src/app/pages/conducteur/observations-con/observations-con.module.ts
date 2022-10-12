import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ObservationsConPageRoutingModule } from './observations-con-routing.module';

import { ObservationsConPage } from './observations-con.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationsConPageRoutingModule,
    TranslateModule
  ],
  declarations: [ObservationsConPage]
})
export class ObservationsConPageModule {}
