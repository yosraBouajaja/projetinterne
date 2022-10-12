import { UserService } from './../../../Services/user.service';
import { Subscription } from 'rxjs';
import { MenuController, ModalController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DetailannonceEnPage } from '../detailannonce-en/detailannonce-en.page';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-annonce-en',
  templateUrl: './annonce-en.page.html',
  styleUrls: ['./annonce-en.page.scss'],
})
export class AnnonceEnPage implements OnInit {
  lstTotalAnnon = [];
  lstAnnon = [];
  index = 0;
  infiniteScroll;
  sub: Subscription;
  sub2: Subscription;
  constructor(private US: UserService, private menu: MenuController, private modalCtrl: ModalController, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(localStorage.getItem('langage'));  }

  ngOnInit() {
    this.menu.enable(true, localStorage.getItem('role'));

    this.sub2 = this.US.getAnonncesUser(localStorage.getItem('token'), localStorage.getItem('userid')).subscribe(lstannonce => {

      this.sub = this.US.getAnonncesClasse(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {
        this.lstTotalAnnon = val.concat(lstannonce);
        this.lstTotalAnnon = this.lstTotalAnnon.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'seconds'))

        for (let i = this.index; i < 10; i++) {
          if (this.lstTotalAnnon[i]) { this.lstAnnon.push(this.lstTotalAnnon[i]); }
        }
        this.index = 10;
      })
    });
  }

  async showModal(item) {
    if (item.message != undefined) {
      const modal = await this.modalCtrl.create({
        component: DetailannonceEnPage
      })
      var ch = JSON.stringify(item);
      localStorage.setItem('DannonceEn', ch);
      await modal.present();
    }
  }

  doRefresh(event) {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();

    this.sub2 = this.US.getAnonncesUser(localStorage.getItem('token'), localStorage.getItem('userid')).subscribe(lstannonce => {

      this.sub = this.US.getAnonncesClasse(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {
        this.lstTotalAnnon = val.concat(lstannonce);
        this.lstTotalAnnon = this.lstTotalAnnon.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'minutes'))


        this.lstAnnon = this.lstTotalAnnon;

        event.target.complete();
      })
    });
  }

  loadData(event) {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();

    this.sub2 = this.US.getAnonncesUser(localStorage.getItem('token'), localStorage.getItem('userid')).subscribe(lstannonce => {

      this.sub = this.US.getAnonncesClasse(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {
        this.lstTotalAnnon = val.concat(lstannonce);
        this.lstTotalAnnon = this.lstTotalAnnon.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'minutes'))
        this.lstAnnon = this.lstTotalAnnon;
      })
    });
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.lstAnnon.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }


  download(doc) {
    window.open(this.US.downloadfiles(doc), '_system', 'location=yes')

  }
  formatDate(date) {
    return moment(date).format('HH:mm DD-MM-YYYY')
  }

}
