import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/Services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-historique',
  templateUrl: './detail-historique.page.html',
  styleUrls: ['./detail-historique.page.scss'],
})
export class DetailHistoriquePage implements OnInit {

  voyage;
  etudiant ;
  classe;
  obj;
  list=[];

  constructor(private modalCtrl: ModalController,private US: UserService, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
  //  this.translate.setDefaultLang(localStorage.getItem('langage'));
    }

  ngOnInit() { 
    this.voyage =JSON.parse(localStorage.getItem('Dvoyage'));  
    this.getEleve();
  }

  
  async close (){
    await this.modalCtrl.dismiss();
  }

   getEleve(){ 
     console.log(this.voyage.voyageAttendances.length);
     
     for(let i=0;i< this.voyage.voyageAttendances.length; i++){
      this.US.vide(localStorage.getItem('token'),this.voyage.voyageAttendances[i].eleve).subscribe(val=>{   
        console.log(val);           
        //@ts-ignore
        var obj ={et: val.nom, cl : val.classe.nomFr}
        this.list.push(obj)
        console.log(obj,this.list);

      });
     }   
     
  }

}
