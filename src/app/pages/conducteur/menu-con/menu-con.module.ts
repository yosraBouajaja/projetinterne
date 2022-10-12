import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MenuConPageRoutingModule } from './menu-con-routing.module';

import { MenuConPage } from './menu-con.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuConPageRoutingModule,
    TranslateModule
  ],
  declarations: [MenuConPage]
})
export class MenuConPageModule {}
