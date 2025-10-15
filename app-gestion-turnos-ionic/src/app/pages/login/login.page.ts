import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async login() {
    const { error } = await this.auth.signIn(this.email, this.password);

    if (error) {
      const al = await this.alertCtrl.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK'],
      });
      await al.present();
      return;
    }

    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }
}