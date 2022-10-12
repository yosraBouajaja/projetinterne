import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { DevoirPageRoutingModule } from './devoir-routing.module';

import { DevoirPage } from './devoir.page';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevoirPageRoutingModule,
    NgCalendarModule,
    TranslateModule
  ],
  declarations: [DevoirPage]
})
export class DevoirPageModule {}
