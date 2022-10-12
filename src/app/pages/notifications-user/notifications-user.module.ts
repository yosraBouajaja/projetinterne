import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationsUserPageRoutingModule } from './notifications-user-routing.module';

import { NotificationsUserPage } from './notifications-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NotificationsUserPageRoutingModule
  ],
  declarations: [NotificationsUserPage]
})
export class NotificationsUserPageModule {}
