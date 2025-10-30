import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from 'src/app/services/auth';
import { addIcons } from 'ionicons';
import { constructOutline } from 'ionicons/icons';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon
  ]
})

export class TabsPage {
  constructor(private auth: Auth, private router: Router) {
    addIcons({ constructOutline });
  }

  async logoutDirect() {
    await this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}

