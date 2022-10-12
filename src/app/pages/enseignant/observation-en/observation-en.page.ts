import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-observation-en',
  templateUrl: './observation-en.page.html',
  styleUrls: ['./observation-en.page.scss'],
})
export class ObservationEnPage implements OnInit {

  constructor(private menu: MenuController, private US: UserService,private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(localStorage.getItem('langage'));   }

  ngOnInit() {
    this.menu.enable(true,localStorage.getItem('role'));

  }

}
