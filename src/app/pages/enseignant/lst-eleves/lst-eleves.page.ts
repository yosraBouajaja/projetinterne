import { EleveInfoEnPage } from './../eleve-info-en/eleve-info-en.page';
import { MenuController, ModalController } from '@ionic/angular';
import { UserService } from './../../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-lst-eleves',
  templateUrl: './lst-eleves.page.html',
  styleUrls: ['./lst-eleves.page.scss'],
})
export class LstElevesPage implements OnInit {

  constructor(private US:UserService,private modalController:ModalController,private menu:MenuController,private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(localStorage.getItem('langage'));   }
lsteleves=[];
lstelevesBack=[];
searchTerm='';
  ngOnInit() {
    this.menu.enable(true,localStorage.getItem('role'));

    this.US.GetClasse(localStorage.getItem('classe')).subscribe(val=>{
      this.lsteleves=val.eleveAnneeScolaires
      this.lstelevesBack=val.eleveAnneeScolaires
    })
  }

  search(){
  this.lsteleves=this.lstelevesBack
    this.lsteleves=  this.lsteleves.filter(item => {
      return item.nom.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    if(this.searchTerm ===""){
      this.lsteleves=this.lstelevesBack
    }
  }
  
  async Show(id){
    localStorage.setItem('id',id.eleve.id);
    const modal = await this.modalController.create({
      component: EleveInfoEnPage,
      cssClass: 'my-custom-class'
    });
     await modal.present().then(()=>{
    
    })
   
  }

}
