import { Subscription } from 'rxjs';
import { UserService } from './../../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { DetailannonceEnPage } from '../detailannonce-en/detailannonce-en.page';
import { DetailExerciceEnPage } from '../detail-exercice-en/detail-exercice-en.page';
import { DetailTpCoursEnPage } from '../detail-tp-cours-en/detail-tp-cours-en.page';
import { DetailCoursTpEnPage } from '../detail-cours-tp-en/detail-cours-tp-en.page';

@Component({
  selector: 'app-notifications-en',
  templateUrl: './notifications-en.page.html',
  styleUrls: ['./notifications-en.page.scss'],
})
export class NotificationsEnPage implements OnInit {
  lstnotif = [];
  totalnotif = [];
  sub: Subscription
  localisation = "";
  index;
  lstAnnon = [];
  targetId;
  infiniteScroll = document.getElementById('infinite-scroll');

  constructor(private US: UserService, private menu: MenuController, private modalCrtl: ModalController, private nav: NavController) { }

  ngOnInit() {
    NavController
    this.menu.enable(true, localStorage.getItem('role'));
    this.localisation = location.pathname;
 
    this.sub = this.US.GetNotificationsByID().subscribe(val=>{
      this.lstnotif = val;
      this.lstnotif.reverse();
    })

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
  }

  ionViewWillEnter() {
    this.index = 0
    this.US.GetNotificationsByID().subscribe(val=>{
      this.lstnotif = val;
      this.lstnotif.reverse();
      this.SetNotifStatustoRead();
      this.index = 10;
    })
   


  }

  ionViewDidEnter() {
    this.sub.unsubscribe();
    this.sub = this.US.GetNotificationsByID().subscribe(val => {
      this.lstnotif = val;
      this.lstnotif.reverse();
    });
  }

  formatDate(date: Date) {
    return moment(date).format('HH:mm DD-MM-YYYY')
  }

  SetNotifStatustoRead() {
  }

  doRefresh(event) {
    this.sub.unsubscribe();
    this.sub = this.US.GetNotificationsByID().subscribe(val => {
      this.lstnotif = val;
      this.lstnotif.reverse();
      event.target.complete();
    });
  }

  
  loadData(event) {
    this.sub.unsubscribe();
    this.sub = this.US.GetNotificationsByID().subscribe(val => {
      this.lstnotif = val;
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
    console.log(data);
    
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
    }
    else if(data.sujet === ('annonce')){
      this.getId(data)
    }
  }

   getId(item){   
     console.log(item,item.data.targetId);
     
    this.targetId = item.data.targetId;
    this.show();
  }

  async show(){  
    console.log("this.lstAnnon",this.lstAnnon);    
    for(let i = 0; i < this.lstAnnon.length; i++){
      console.log(this.lstAnnon[i].id);
      
      if(this.lstAnnon[i].id === this.targetId){
        const modal = await this.modalCrtl.create({
          component : DetailannonceEnPage
        })
       var ch =  JSON.stringify(this.lstAnnon[i])
        localStorage.setItem('DannonceEn',ch);
        await modal.present();
      }
    }   
  }


  goCours(item) {
    this.US.GetCoursByID(localStorage.getItem('token'), item.data.targetId).subscribe(async val => {
      const modal = await this.modalCrtl.create({
        component: DetailCoursTpEnPage
      })
      var ch = JSON.stringify(val)
      localStorage.setItem('DcoursEn', ch);
      await modal.present();

    })
  }

  goTP(item) {
    this.US.GetTpByID(localStorage.getItem('token'), item.data.targetId).subscribe(async val => {
      const modal = await this.modalCrtl.create({
        component: DetailTpCoursEnPage
      })
      var ch = JSON.stringify(val)
      localStorage.setItem('DtpEn', ch);
      await modal.present();

    })
  }

  goHomeWork(item) {
    this.US.GetHomeworkByID(localStorage.getItem('token'), item.data.targetId).subscribe(async val => {
      const modal = await this.modalCrtl.create({
        component: DetailExerciceEnPage
      })
      var ch = JSON.stringify(val)
      localStorage.setItem('DexerciceEn', ch);
      await modal.present();

    })
  }

}
