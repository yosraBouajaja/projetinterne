import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthGuardService } from '../Services/auth-guard.service';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private auth:AuthService, private nav: NavController, private userService: UserService, private router:Router) { }

  ngOnInit() {

      setTimeout(() => {
        this.router.navigateByUrl('/')
      }, 3000);


  }

}
