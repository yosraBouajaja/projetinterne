import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/Services/user.service';
import { BulletinPage } from '../bulletin/bulletin.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lst-bulletins',
  templateUrl: './lst-bulletins.page.html',
  styleUrls: ['./lst-bulletins.page.scss'],
})
export class LstBulletinsPage implements OnInit{
lstbulletins=[];
lst=[];

  constructor(private userService:UserService,private modalController:ModalController,
    private menu:MenuController,private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang(localStorage.getItem('langage'));      }
 
  ngOnInit() {
    this.menu.enable(true,localStorage.getItem('role'));

    this.userService.bulletinAut(localStorage.getItem('token'),localStorage.getItem('eleveAnneeScolaires')).subscribe(val=>{
      console.log("bulletinAut",val);
      this.lstbulletins = val;
      for(let i=0; i< this.lstbulletins.length; i++){
        if(this.lstbulletins[i].bulletinClasse.periode.nomFr === "1er Trimestre"){
          this.lst[0]=(this.lstbulletins[i]);
        }
        if(this.lstbulletins[i].bulletinClasse.periode.nomFr === "2ème Trimestre"){
          this.lst[1]=(this.lstbulletins[i]);
        }
        if(this.lstbulletins[i].bulletinClasse.periode.nomFr === "3ème Trimestre"){
          this.lst[2]=(this.lstbulletins[i]);
        }
      }
      console.log("bulletinAut",this.lst);
    });
  }

showBulletin(ch){
  this.userService.getBulletinEtudiant(localStorage.getItem('token'),ch).subscribe(async value=>{
    console.log(value);    
    const modal = await this.modalController.create({
      component: BulletinPage,
      cssClass: 'my-custom-class',
      componentProps:{
        bulletin:value
      }
    });
    return await modal.present();
  });
}

}
