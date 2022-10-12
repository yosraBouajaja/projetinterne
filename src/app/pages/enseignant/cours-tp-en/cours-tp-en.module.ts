import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursTpEnPageRoutingModule } from './cours-tp-en-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoursTpEnPage } from './cours-tp-en.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursTpEnPageRoutingModule,
    TranslateModule
  ],
  declarations: [CoursTpEnPage]
})
export class CoursTpEnPageModule {}
