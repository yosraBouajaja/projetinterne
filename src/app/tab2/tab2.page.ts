import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

export interface descrip {
  matiere: string;
  classe: string;
  badge: string;
  Salle: string;
  dateen: string;
}
export interface timetable {
  table: descrip[];
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  options = {
    cssClass: 'my-custom-interface'
  };
  year = new Date().getFullYear();
  month = new Date().getMonth();
  day = new Date();
  days = ["Dimanche", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  months = ["Janvier", "Février", "Mars", "Avril", "May", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
  today = this.days[this.day.getDay()];
  thismonth = this.months[this.month];
  SelectedDay = '1';
  index = this.day.getDay();
  Timetable: descrip[];
  lstseances = [];
  lstmatieres = [];
  lstusers = [];
  lstsalles = [];
  lstdays = []

  /* new variable */
  emploisDuTemps;
  enseignant = [];
  sub: Subscription;
  numberDay;
  groupe;

  constructor(private menu: MenuController, private US: UserService, public loadingController: LoadingController) {


    this.Timetable = new Array();
    //this.changeday(0);
    var days: descrip[] = [{ matiere: 'Arabe', classe: '9eme B6', badge: 'Red', Salle: 'Salle 10', dateen: '9:00-12:00' }];
  }

  ngOnInit() {
    this.numberDay = (new Date()).getDay();
    //this.presentLoading();
    for (let i = 1; i < 7; i++) {
      this.lstdays.push(moment().startOf('week').date() + i);
    }
    console.log("eleveAnneeScolaires", localStorage.getItem('eleveAnneeScolaires'));

    this.US.getcursusStudent(localStorage.getItem('token'), localStorage.getItem('eleveAnneeScolaires')).subscribe(seance => {

      // //@ts-ignore
      // this.US.GetGroup(localStorage.getItem('token'), seance.groupClasse).subscribe(val => {
      //   //@ts-ignore
      //   this.groupe = val.nomFr;
      // });

      //@ts-ignore
      this.emploisDuTemps = seance.classe.seances;
      console.log(this.emploisDuTemps);
      this.getenseignant()


    });
    // this.US.getsalleclasse(localStorage.getItem('token')).subscribe(salles=>{
    //   console.log("salles,salles",salles);
    //   //@ts-ignore
    //   this.lstsalles=salles;
    //   });
  }

  getmatiere(id) {
    var matiere = ''

    for (let i = 0; i < this.lstmatieres.length; i++) {
      if (this.lstmatieres[i].id == Number(id)) {
        matiere = this.lstmatieres[i].nomFr;
      }
    }
    return matiere
  }
  getclasse(id) {

  }
  getsalle(id) {
    var salle = ''
    var idE = this.US.SerializeJSONDL(id, "/api/salle_classes/");
    // this.US.getsalleclasseID(idE).subscribe(classe=>{
    //   console.log("classe",classe);

    //   //@ts-ignore
    //   salle=classe.nomFr;
    //   console.log("lstsalles",salle);
    // });
    // console.log("lstsalles",salle);

    for (let i = 0; i < this.lstsalles.length; i++) {
      if (this.lstsalles[i].id == Number(idE)) {
        salle = this.lstsalles[i].nomFr;
      }
    }
    return salle
  }

  getenseignant() {
    var obj;
    for (let j = 0; j < this.emploisDuTemps.length; j++) {

      if (this.emploisDuTemps[j].enseignant) {
        var idE = this.US.SerializeJSONDL(this.emploisDuTemps[j].enseignant, "/api/users/");
        this.sub = this.US.getuser(localStorage.getItem('token'), idE).subscribe(enseignant => {
          obj = { firstname: enseignant.firstname, lastname: enseignant.lastname }
          this.enseignant.push(obj);
        })
      } else {
        obj = { firstname: "", lastname: "" }
        this.enseignant.push(obj)
      }
    }
    this.changeday(this.numberDay);
  }

  ionViewDidEnter() {
    this.menu.enable(true, 'Parent');
    this.menu.close();
    var element = document.getElementById(this.numberDay);
    element.classList.remove("unselected");
    element.classList.add("selected")
  }

  changeday(i) {
    console.log("i", i);
    if (this.index == 0) { this.index = 1 }
    if (i != this.index) {
      var element = document.getElementById(String(i));
      //element.classList.remove("selected");
      if (element) {
        element.classList.remove("unselected");
        element.classList.add("selected");
      }
      element = document.getElementById(String(this.index));
      element.classList.add("unselected");
      element.classList.remove("selected");
      this.index = i;
    }
    var days = new Array();
    console.log(this.emploisDuTemps);
    this.emploisDuTemps.sort((a, b) => moment(b.heureDebut).diff(a.heureDebut, 'minutes'));
    this.emploisDuTemps.reverse();

    for (let j = 0; j < this.emploisDuTemps.length; j++) {

      if (this.emploisDuTemps[j].jour == i) {


        if (this.emploisDuTemps[j].groupClasse) {
          console.log(i, this.emploisDuTemps[j].groupClasse);
          days.push({
            matiere: this.emploisDuTemps[j].matiere.nomFr,
            classe: '',
            badge: '#167bbf',
            Salle: this.emploisDuTemps[j].salleClasse.nomFr,//this.getsalle(this.emploisDuTemps[j].salleClasse),
            dateen: (Number(new Date(this.emploisDuTemps[j].heureDebut).getHours())) + ':' + this.formatdate(new Date(this.emploisDuTemps[j].heureDebut).getMinutes()) + '-' + (Number(new Date(this.emploisDuTemps[j].heureFin).getHours())) + ':' + this.formatdate(new Date(this.emploisDuTemps[j].heureFin).getMinutes()),
            Enseignant: "", //this.enseignant[j].firstname 
            group: this.emploisDuTemps[j].groupClasse.nomFr
          })
        }
        else {
          days.push({
            matiere: this.emploisDuTemps[j].matiere.nomFr,
            classe: '',
            badge: '#167bbf',
            Salle: this.emploisDuTemps[j].salleClasse.nomFr,//this.getsalle(this.emploisDuTemps[j].salleClasse),
            dateen: (Number(new Date(this.emploisDuTemps[j].heureDebut).getHours())) + ':' + this.formatdate(new Date(this.emploisDuTemps[j].heureDebut).getMinutes()) + '-' + (Number(new Date(this.emploisDuTemps[j].heureFin).getHours())) + ':' + this.formatdate(new Date(this.emploisDuTemps[j].heureFin).getMinutes()),
            Enseignant: "", //this.enseignant[j].firstname 
            group: ""
          })
        }

      }
    }
    console.log("days", days);

    this.Timetable = days;
  }

  // changeday(i) {
  //   if (this.index == 0) { this.index = 1 }
  //   if (i != this.index) {
  //     var element = document.getElementById(String(i));
  //     if (element) {
  //       element.classList.remove("unselected");
  //       element.classList.add("selected");
  //     }
  //     element = document.getElementById(String(this.index));
  //     element.classList.add("unselected");
  //     element.classList.remove("selected");
  //     this.index = i;
  //   }
  //   var days = new Array();
  //   this.lstseances.sort((a, b) => moment(b.heureDebut).diff(a.heureDebut, 'minutes'));
  //   this.lstseances.reverse();
  //   for (let j = 0; j < this.lstseances.length; j++) {
  //     if (this.lstseances[j].jour == i) {
  //       let en = ''
  //       if (this.lstseances[j].enseignant) {
  //         en = this.lstseances[j].enseignant.firstname + ' ' + this.lstseances[j].enseignant.lastname
  //       }

  //       days.push({
  //         matiere: this.getmatiere(this.lstseances[j].matiere),
  //         classe: '',
  //         badge: '#167bbf',
  //         Salle: this.getsalle(this.lstseances[j].salleClasse),
  //         dateen: (Number(new Date(this.lstseances[j].heureDebut).getHours())) + ':' + this.formatdate(new Date(this.lstseances[j].heureDebut).getMinutes()) + '-' + (Number(new Date(this.lstseances[j].heureFin).getHours())) + ':' + this.formatdate(new Date(this.lstseances[j].heureFin).getMinutes()),
  //         Enseignant: en
  //       })
  //     }
  //   }
  //   this.Timetable = days;




  // }

  getbordercolor(color) {
    return '1px solid' + color;
  }
  formatdate(minute) {
    if (minute < 10) {
      return '0' + minute;
    } else {
      return minute
    }
  }
  getJour(jour) {
    var day = new Date();
    var today = this.days[day.getDay()];
    if (this.today == 'Lun') {
    }
    else if (this.today == 'Mar') { }
    else if (this.today == 'Mer') { }
    else if (this.today == 'Jeu') { }
    else if (this.today == 'Ven') { }
    else if (this.today == 'Sam') { }
  }

  ionViewWillLeave() {
    this.menu.close();
  }
}