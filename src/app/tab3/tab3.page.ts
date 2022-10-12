import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  nom = ''
  prenom = ''
  Phone = null;

  constructor(private storage: Storage, private translate: TranslateService, private service: UserService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.nom = localStorage.getItem("nom")
    this.prenom = localStorage.getItem("prenom")
    this.Phone = localStorage.getItem("phone")
  }

  disconnect() {
  //  localStorage.clear();
    this.storage.remove('apiToken');
    this.storage.remove('rememberme');
    localStorage.removeItem('reftoken');
  }

  segmentChanged(ev: any) {
    this.service.language = ev.detail.value;
    this.translate.setDefaultLang(localStorage.getItem('langage'));  }

}
