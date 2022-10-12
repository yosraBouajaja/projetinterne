import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { UserService, voyage } from 'src/app/Services/user.service';
import { InfoVoyagePage } from '../info-voyage/info-voyage.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ajout-voyage',
  templateUrl: './ajout-voyage.page.html',
  styleUrls: ['./ajout-voyage.page.scss'],
})
export class AjoutVoyagePage implements OnInit {
  lstCircuit = [];
  lstVehicule = [];
  newVoy: voyage = { circuit: '', vehicule: '', datedepart: moment().format('YYYY-MM-DD HH:mm:ss'), type: '0' }
  constructor(private userService: UserService, private modal: ModalController, private modaTest: ModalController,
    private toastController: ToastController, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
  //  this.translate.setDefaultLang(localStorage.getItem('langage'));       
  }

  ngOnInit() {
    this.userService.GetVehicule(localStorage.getItem('token')).subscribe(veh => {
      this.lstVehicule = veh;
    })
    this.userService.GetCircuit(localStorage.getItem('token')).subscribe(cir => {
      this.lstCircuit = cir;
    })
  }

  close() {
    this.modal.dismiss();
  }

  ajouterVoyage() {
    if (this.newVoy.circuit == '') {
      let msg2;
      var msg = this.translate.get('AddVoyage.AlerteAddCircuit').subscribe(
        value => {
          msg2 = value;
          return value;
        }
      );

      this.showToast(msg2);
      return;
    }
    if (this.newVoy.vehicule == '') {
      let msg2;
      var msg = this.translate.get('AddVoyage.AlerteAddVahicule').subscribe(
        value => {
          msg2 = value;
          return value;
        }
      );

      this.showToast(msg2);
      return;
    }

    //@ts-ignore
    this.newVoy.datedepart = moment(this.newVoy.datedepart).format('YYYY-MM-DD HH:mm:ss');

    this.userService.setVoyage(localStorage.getItem('token'), this.newVoy).subscribe(
      val => {
        var obj = { info: { voyageAttendances: [], id: val }, circuit: this.newVoy }
        this.showModal(obj);
      },
      err => {
        console.log(err)
      }
    )


    this.modal.dismiss();

  }


  async showModal(item) {
    const modal2 = await this.modaTest.create({
      component: InfoVoyagePage,
      componentProps: { selectedVoyage: item },
      cssClass: 'my-custom-class'
    });
    await modal2.present();
    //  modal2.onDidDismiss().then(val=>{
    //   this.changeday(this.index)

    //  })       
  }

  async showToast(content) {
    const toast = await this.toastController.create({
      message: content,
      duration: 2000
    });
    toast.present();
  }

  checkIdenticalVoyage(voy1: voyage, voy2: voyage) {

    if (moment(voy1.datedepart).diff(voy2.datedepart, 'days') == 0) {

      if (voy1.circuit == voy2.circuit) {
        if (voy1.vehicule == voy2.vehicule) {
          return false;

        }
        else {
          return true;
        }
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }
}
