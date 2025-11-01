import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from 'src/app/services/auth';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule  
  ]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage = '';

  constructor(
    private auth: Auth, 
    private router: Router,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    this.analytics.trackPageView('login', '/login');
  }

  async login() {
    const { data, error } = await this.auth.login(this.email, this.password);

    if (error) {
      this.errorMessage = error.message;
      console.error(error);
      this.analytics.trackError('login_error', error.message);
    } else {
      this.analytics.trackLogin(data.user?.id || 'unknown');
      this.router.navigateByUrl('/tabs');
    }
  }
}