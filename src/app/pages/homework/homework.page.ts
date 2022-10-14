import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { DetailExercicePage } from '../detail-exercice/detail-exercice.page';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
  class;
  lsthomework = [];
  lstmatieres = [];
  lstusers = [];
  // test = ''
  constructor(private menu: MenuController, private US: UserService, private modalCtrl: ModalController, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(localStorage.getItem('langage'));
  }

  ngOnInit() {
    this.menu.enable(true, localStorage.getItem('role'));

    this.US.getHomeWork(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {
      this.lsthomework = val;
      this.lsthomework.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'minutes'));
    });
  }

  ionViewWillLeave() {
    this.menu.close();
  }


  async showModal(item) {

    if (item.subject != undefined) {
      const modal = await this.modalCtrl.create({
        component: DetailExercicePage
      })
      var ch = JSON.stringify(item);
      localStorage.setItem('Dexercice', ch);
      await modal.present();
    }
  }


  doRefresh(event) {

    this.US.getHomeWork(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {

      this.lsthomework = val;

      this.lsthomework.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'minutes'));
      event.target.complete();

    });
  }


  loadData(event) {
    this.US.getHomeWork(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {

      this.lsthomework = val;

      this.lsthomework.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'minutes'));

    });
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.lsthomework.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
