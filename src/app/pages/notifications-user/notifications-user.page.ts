import { UserService } from './../../Services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModalController, NavController } from '@ionic/angular';
import { DetailAnnoncePage } from '../detail-annonce/detail-annonce.page';
import { DetailTPPage } from '../detail-tp/detail-tp.page';
import { DetailCoursPage } from '../detail-cours/detail-cours.page';
import { DetailExercicePage } from '../detail-exercice/detail-exercice.page';
import { TranslateService } from '@ngx-translate/core';
import { DetailannonceEnPage } from '../enseignant/detailannonce-en/detailannonce-en.page';
@Component({
  selector: 'app-notifications-user',
  templateUrl: './notifications-user.page.html',
  styleUrls: ['./notifications-user.page.scss'],
})
export class NotificationsUserPage implements OnInit {
  lstnotif = [];
  totalnotif = [];
  sub: Subscription
  index;
  localisation = "";

  sub1: Subscription;
  sub3: Subscription;
  sub2: Subscription;
  indexx = 0;
  targetId;
  lstAnnon = [];
  lstTotalAnnon = [];
  infiniteScroll = document.getElementById('infinite-scroll');
  constructor(private US: UserService, private nav: NavController, public modalCtrl: ModalController, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(localStorage.getItem('langage'));   }

  ngOnInit() {
    this.localisation = location.pathname;

    this.US.GetNotificationsByID().subscribe(value=>{
      console.log("notiff",value);      
    });
    this.US.getAnonncesUser(localStorage.getItem('token'), localStorage.getItem('userid')).subscribe(lstannonce => {

      this.US.getAnonncesClasse(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {
         this.lstAnnon = val.concat(lstannonce);
         this.lstAnnon = this.lstAnnon.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'seconds'))
 
         for (let i = this.index; i < 10; i++) {
           if (this.lstAnnon[i]) { this.lstAnnon.push(this.lstAnnon[i]); }
         }
         this.index = 10;
       })
     });
    // this.sub3 = this.US.getAnonncesUser(localStorage.getItem('token'), localStorage.getItem('ideleve')).subscribe(lstannonceeleve => {
    //   this.sub2 = this.US.getAnonncesUser(localStorage.getItem('token'), localStorage.getItem('userid')).subscribe(lstannonce => {

    //     this.sub1 = this.US.getAnonncesClasse(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(val => {

    //       this.lstTotalAnnon = val.concat(lstannonce, lstannonceeleve);
    //       this.lstTotalAnnon = this.lstTotalAnnon.filter((obj, pos, arr) => {
    //         return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
    //       });
    //       this.lstTotalAnnon = this.lstTotalAnnon.sort((a, b) => moment(b.createdAt).diff(a.createdAt, 'seconds'))

    //       for (let i = this.indexx; i < 10; i++) {
    //         if (this.lstTotalAnnon[i]) {
    //           this.lstAnnon.push(this.lstTotalAnnon[i]);

    //         }
    //       }
    //       this.indexx = 10;
    //     })
    //   });
    // });
  }

  ionViewWillEnter() {
    this.lstnotif = [];
    this.totalnotif = [];
    this.index = 0
    this.sub = this.US.GetNotificationsByID().subscribe(val => {

      this.totalnotif = val;
      this.totalnotif = this.totalnotif.reverse();

      for (let i = this.index; i < 10; i++) {
        if (this.totalnotif[i]) { this.lstnotif.push(this.totalnotif[i]); }
      }
      this.index = 10;
      this.US.getAnonncesClasse(localStorage.getItem('token'), localStorage.getItem('classe')).subscribe(anonn => {
      })
    })
  }

  formatDate(date: Date) {
    return moment(date).format('HH:mm DD-MM-YYYY')
  }

  doRefresh(event) {
    this.sub.unsubscribe();
    this.sub = this.US.GetNotificationsByID().subscribe(val => {
      this.lstnotif = val;
      this.lstnotif = this.lstnotif.reverse();
        event.target.complete();}
      );
  }
  
  loadData(event) {
    this.sub.unsubscribe();
    this.sub = this.US.GetNotificationsByID().subscribe(val => {
      this.lstnotif = val;
      this.lstnotif = this.lstnotif.reverse();
    });
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.lstnotif.length === 150) {
        event.target.disabled = true;
      }
    }, 500);
  }


  ionViewWillLeave() {
    for (let i = 0; i < this.totalnotif.length; i++) {
      if (this.totalnotif[i].readAt == null) {
        this.US.Readat(localStorage.getItem('token'), this.totalnotif[i].id);
      }

    }
  }

  checkNotif(data) {
    if (data.sujet === ('devoir')) {
      this.nav.navigateForward('/devoir')
    }
    else if (data.sujet === 'absence') {
      this.nav.navigateForward('/presence')
    }
    else if (data.sujet === ('cours')) {
      // this.nav.navigateForward('/courset-tp')
      this.goCours(data);
    }
    else if (data.sujet === ('tp')) {
      this.goTP(data);

    }
    else if (data.sujet === ('exercice')) {
      // this.nav.navigateForward('/homework')}
      this.goHomeWork(data);

    } else if(data.sujet === ('annonce')){
      this.getId(data)
    }
  }

   getId(item){   
    this.targetId = item.id;
    this.show();
  }

  async show(){  
    for(let i = 0; i < this.lstAnnon.length; i++){
      if(this.lstAnnon[i].id === this.targetId){
        const modal = await this.modalCtrl.create({
          component : DetailannonceEnPage
        })
       var ch =  JSON.stringify(this.lstAnnon[i])
        localStorage.setItem('Dannonce',ch);
        await modal.present();
      }
    }   
  }


  goCours(item) {
    this.US.GetCoursByID(localStorage.getItem('token'), item.data.targetId).subscribe(async val => {
      const modal = await this.modalCtrl.create({
        component: DetailCoursPage
      })
      var ch = JSON.stringify(val)
      localStorage.setItem('Dcours', ch);
      await modal.present();

    })
  }

  goTP(item) {
    this.US.GetTpByID(localStorage.getItem('token'), item.data.targetId).subscribe(async val => {
      const modal = await this.modalCtrl.create({
        component: DetailTPPage
      })
      var ch = JSON.stringify(val)
      localStorage.setItem('Dtp', ch);
      await modal.present();

    })
  }

  goHomeWork(item) {
    this.US.GetHomeworkByID(localStorage.getItem('token'), item.data.targetId).subscribe(async val => {
      const modal = await this.modalCtrl.create({
        component: DetailExercicePage
      })
      var ch = JSON.stringify(val)
      localStorage.setItem('Dexercice', ch);
      await modal.present();

    })
  }

}
