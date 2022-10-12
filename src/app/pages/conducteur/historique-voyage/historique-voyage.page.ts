import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { DetailHistoriquePage } from './detail-historique/detail-historique.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-historique-voyage',
  templateUrl: './historique-voyage.page.html',
  styleUrls: ['./historique-voyage.page.scss'],
})
export class HistoriqueVoyagePage implements OnInit {

  listV;

  
  constructor(private modalCtrl: ModalController, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
   // this.translate.setDefaultLang(localStorage.getItem('langage')); 
   }

  ngOnInit() {
    this.listV = JSON.parse(localStorage.getItem('listVoyage'));
    console.log(this.listV);
    this.listV.reverse();
    
  }

  async showModal(item){
    console.log(item);
    const modal = await this.modalCtrl.create({
      component : DetailHistoriquePage
    })
    var ch=JSON.stringify(item);
    localStorage.setItem('Dvoyage',ch);
    await modal.present();
  }

 
}
