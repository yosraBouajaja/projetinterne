import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-notifications-con',
  templateUrl: './notifications-con.page.html',
  styleUrls: ['./notifications-con.page.scss'],
})
export class NotificationsConPage implements OnInit {
  lstnotif=[];
  totalnotif=[];
  sub:Subscription;
  index;
   infiniteScroll = document.getElementById('infinite-scroll');
    constructor(private US:UserService,private menu:MenuController) { }
    ngOnInit(){
      this.menu.enable(true,'Conducteur');
    }
    
    ionViewWillEnter() {
      this.lstnotif=[];
  this.totalnotif=[];
      this.index=0
    this.sub=  this.US.GetNotificationsByID().subscribe(val=>{
            
        this.totalnotif=val;
        this.SetNotifStatustoRead();
        this.totalnotif=  this.totalnotif.reverse();
       for (let i = this.index; i < 10; i++) {
       if(this.totalnotif[i])
       {this.lstnotif.push(this.totalnotif[i]);}
       }
       this.index=10;
        this.US.getAnonncesClasse(localStorage.getItem('token'),localStorage.getItem('classe')).subscribe(anonn=>{
        })
      })    
    }

    formatDate(date:Date){
     return moment(date).format('YYYY-MM-DD HH:MM')
    }
    SetNotifStatustoRead(){
    }
    doRefresh(event){
      this.sub.unsubscribe();
      this.sub=  this.US.GetNotificationsByID().subscribe(val=>{
        this.lstnotif=val;
        event.target.complete();
      });
  
    }
    ionViewWillLeave(){
      for (let i = 0; i < this.totalnotif.length; i++) {
       if(this.totalnotif[i].readAt==null)
       {
        this.US.Readat(localStorage.getItem('token'), this.totalnotif[i].id);
       }
        
      }
    }

    loadData(event) {
      this.sub.unsubscribe();
      this.sub=  this.US.GetNotificationsByID().subscribe(val=>{
        this.lstnotif=val;
      });
      setTimeout(() => {
        event.target.complete();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.lstnotif.length === 1000) {
          event.target.disabled = true;
        }
      }, 500);
    }
    
}
