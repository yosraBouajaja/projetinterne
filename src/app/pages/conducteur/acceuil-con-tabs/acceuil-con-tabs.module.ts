import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AcceuilConTabsPageRoutingModule } from './acceuil-con-tabs-routing.module';

import { AcceuilConTabsPage } from './acceuil-con-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceuilConTabsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AcceuilConTabsPage]
})
export class AcceuilConTabsPageModule {}
