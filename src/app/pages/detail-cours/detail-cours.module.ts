import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCoursPageRoutingModule } from './detail-cours-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DetailCoursPage } from './detail-cours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCoursPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailCoursPage]
})
export class DetailCoursPageModule {}
