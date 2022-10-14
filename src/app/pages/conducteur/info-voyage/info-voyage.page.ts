import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { AttVoyage, statusVoyage, UserService, VoyageAttEleve } from 'src/app/Services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-info-voyage',
  templateUrl: './info-voyage.page.html',
  styleUrls: ['./info-voyage.page.scss'],
})
export class InfoVoyagePage implements OnInit {
  data = null;
  lstClasses = [];
  lstetudiants = [];
  newEleve= null;
  lstids = [];
  newStudents = []
  attendance: AttVoyage = {
    voyage: -1 + '',
    users: []
  }
  listeE = [];
  @Input() selectedVoyage
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent 

  constructor(private alertController: AlertController, private userService: UserService,
     private toastController: ToastController, private barcodeScanner: BarcodeScanner,
      private modal: ModalController,private translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
       // this.translate.setDefaultLang(localStorage.getItem('langage'));       
      }

  ngOnInit() {
    this.userService.GetClasses().subscribe(classe => {
      this.lstClasses = classe;
      this.userService.GetEleves().subscribe(value => {
        if (this.selectedVoyage.info.voyageAttendances.length != 0) {
          for (let i = 0; i < this.selectedVoyage.info.voyageAttendances.length; i++) {
            let eleve = this.selectedVoyage.info.voyageAttendances[i].eleve.replace('/api/eleve_annee_scolaires/', '')
            this.lstetudiants.push(
              {
                nom: this.getEleveanneeScolaire(eleve, value),
                status: String(this.selectedVoyage.info.voyageAttendances[i].statut),
                id: eleve
              });
            this.lstids.push(this.selectedVoyage.info.voyageAttendances[i].eleve.id);
          }
        }

        for (const item of value) {
          if (!this.existinArray(item.id)) {
           if(item.classe != null){
            if(typeof item.classe === 'object'){
              let id = item.classe.id;
              item.classe = this.getClasseId(id);
            }
            this.newStudents.push(item);

           }
          }
        }
        
      });
      console.log("newStudents",this.newStudents , this.lstetudiants);

    });

  }

  scan() {
  //  BarcodeScannerOptions {
   
      this.barcodeScanner.encode("textt",null);
    this.barcodeScanner.scan().then(barcodeData => {
      let primary = barcodeData.text;
      let ch = primary.split(':')
      if (!this.existinArray(ch[0])) {
        this.existinArray(ch[0])
        this.attendance = {
          voyage: String(this.selectedVoyage.info.id),
          users: [ch[0]],
        }

        this.userService.setVoyageAttendance(localStorage.getItem('token'), this.attendance).subscribe(
          val => { },
          err => {
          }
        );
        this.lstetudiants.push({ nom: ch[1], status: 0, id: ch[0] });
        this.listeE.push({ id: String(ch[0]) });
        //this.newEleve
        this.lstids.push(ch[0]); 
      }
      else {
        let msg2;
          var msg = this.translate.get('AddVoyage.exist').subscribe(
            value => {
              msg2 = value;
             return value;
            }
          );
          
          this.showToast(msg2);
      }
    }).catch(err => {
      console.log('Error', err);
    }
    );
   
  }


 
  async showToast(content) {
    const toast = await this.toastController.create({
      message: content,
      duration: 2000
    });
    toast.present();
  }

  checkifexist(ch) {
    if (ch == '') { return false; }
    let ok = true;
    for (let i = 0; i < this.lstids.length; i++) {
      if (this.lstids[i] == ch) {
        ok = false;
      }
    }
    return ok;
  }

  close() {
    this.modal.dismiss();
  }

  demarrerVoyage() {
    for (const item of this.lstetudiants) {
      item.status = "1"
    }

    this.attendance = {
      voyage: String(this.selectedVoyage.info.id),
      users: this.listeE
    }
    console.log(this.selectedVoyage,this.listeE,this.attendance);
    

    this.userService.setVoyageAttendance(localStorage.getItem('token'), this.attendance).subscribe(
      val => {
        console.log("setVoyageAttendance",val);
        
       },
      err => {
        console.log("err",err);
        
      }
    );
    let voy: statusVoyage = {
      id: String(this.selectedVoyage.info.id),
      status: '1'
    }
    this.selectedVoyage.info.statut = '1';

    this.userService.updateSatusVoyage(localStorage.getItem('token'), voy).subscribe(
      val => {
        console.log(val);
      },
      err => {
        console.log(err);
      }
    );
  }

  cloturerVoyage() {
    let voy: statusVoyage = {
      id: String(this.selectedVoyage.info.id),
      status: '2'
    }

    this.selectedVoyage.info.statut = '2';

    this.userService.updateSatusVoyage(localStorage.getItem('token'), voy).subscribe(
      val => {
        console.log("val");
      },
      err => {
        console.log(err);
      }
    );
  }

  async DemarrerVoyageAlert() {
    let msg2;
          var msg = this.translate.get('AddVoyage.AlerteDemarrer').subscribe(
            value => {
              // value is our translated string
              msg2 = value;
             return value;
            }
          );

          let voyage;
          var msg = this.translate.get('AddVoyage.Voyage').subscribe(
            value => {
              // value is our translated string
              voyage = value;
             return value;
            }
          );

          let ann;
          var msg = this.translate.get('Buttons.Annuler').subscribe(
            value => {
              // value is our translated string
              ann = value;
             return value;
            }
          );

          
          let dem;
          var msg = this.translate.get('Buttons.Demarrer').subscribe(
            value => {
              // value is our translated string
              dem = value;
             return value;
            }
          );

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: voyage,
      message: msg2,
      buttons: [
        {
          text: ann,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: dem,
          handler: () => {
            this.demarrerVoyage();
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  setEtudiant(item, index) {
    let stat = '1';
    if (item.status == '1') {
      stat = '2'
    }
    else {
      stat = '1'
    }
    let att: VoyageAttEleve = {
      //@ts-ignore
      dateEnCour: moment().format('YYYY-MM-DD HH:MM:SS'),
      ideleve: String(item.id),
      statut: stat,
      idvoyage: String(this.selectedVoyage.info.id)
    }
    this.lstetudiants[index].status = stat

    this.userService.setVoyageAttendanceEleve(localStorage.getItem('token'), att).subscribe(
      val => {
        console.log(val);
      },
      err => {
        console.log(err);
      }
    );
  }



  async CloturerVoyageAlert() {
    let msg2;
    var msg = this.translate.get('AddVoyage.AlerteCloturer').subscribe(
      value => {
        // value is our translated string
        msg2 = value;
       return value;
      }
    );

    let voyage;
    var msg = this.translate.get('AddVoyage.Voyage').subscribe(
      value => {
        // value is our translated string
        voyage = value;
       return value;
      }
    );

    let ann;
    var msg = this.translate.get('Buttons.Annuler').subscribe(
      value => {
        // value is our translated string
        ann = value;
       return value;
      }
    );

    
    let dem;
    var msg = this.translate.get('Buttons.Cloturer').subscribe(
      value => {
        // value is our translated string
        dem = value;
       return value;
      }
    );
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: voyage,
      message: msg2,
      buttons: [
        {
          text: ann,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: dem,
          handler: () => {
            if (this.verifyIfallstudentsAreAvailable()) {
              this.cloturerVoyage();
            }
            else {
              let msg2;
          var msg = this.translate.get('AddVoyage.selc').subscribe(
            value => {
              // value is our translated string
              msg2 = value;
             return value;
            }
          );
          
          this.showToast(msg2);
            }
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  verifyIfallstudentsAreAvailable() {
    let ok = true;
    for (const item of this.lstetudiants) {
      if (item.status == '1') {
        ok = false;
      }
    }
    return ok;
  }

  existinArray(id) {
    let ok = false;
    for (let i = 0; i < this.lstetudiants.length; i++) {
      if (this.lstetudiants[i].id == id) {
        ok = true;
        break;
      }

    }
    return ok;
  }

  deleteEtudiant(item, i) {
    for (let i = 0; i < this.lstetudiants.length; i++) {
      if (this.lstetudiants[i].id == item.id) {
        this.lstetudiants.splice(i, 1);
        this.listeE.splice(i, 1);
        break;
      }
    }
  }

  addEleve(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  
    console.log("addEleve");
    
    for (let i = 0; i < this.newStudents.length; i++) {
      if (this.newStudents[i].id == this.newEleve.id) {
        //this.listeE.push(this.newStudents[i].id);
        this.newStudents.splice(i, 1);
        break;
      }
    }
    this.lstetudiants.push({ nom: String(this.newEleve.nom), status: 0, id: String(this.newEleve.id) });
    this.listeE.push({ id: String(this.newEleve.id) });
    this.lstids.push(String(this.newEleve.id));
    this.selectComponent.clear();
  }


  getEleveanneeScolaire(id, list) {
    let ch = '';
    for (const item of list) {
      if (String(item.id) === String(id)) {
        ch = item.nom;
        break;
      }
    }

    return ch;
  }

  getClasseId(id) {
    let ch = '';
    for (const item of this.lstClasses) {
      if (String(item.id) === String(id)) {
        ch = item.nomFr;
        break;
      }
    }

    return ch;
  }
}
