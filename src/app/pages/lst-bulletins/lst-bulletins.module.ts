import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LstBulletinsPageRoutingModule } from './lst-bulletins-routing.module';

import { LstBulletinsPage } from './lst-bulletins.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LstBulletinsPageRoutingModule,
    TranslateModule
  ],
  declarations: [LstBulletinsPage]
})
export class LstBulletinsPageModule {}
