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
      const raw = (error as any)?.message;
      let errorMsg: string;
      if (!raw || raw === '{}' || raw.trim() === '') {
        errorMsg = 'No se pudo conectar con el servidor. Verificá tu conexión o intentá más tarde.';
      } else if (raw === 'Invalid login credentials') {
        errorMsg = 'Correo o contraseña incorrectos.';
      } else if (raw === 'Email not confirmed') {
        errorMsg = 'Debés confirmar tu correo antes de ingresar.';
      } else {
        errorMsg = raw;
      }
      this.errorMessage = errorMsg;
      console.error(error);
      this.analytics.trackError('login_error', errorMsg);
    } else if (data) {
      this.analytics.trackLogin(data.user?.id || 'unknown');
      this.router.navigateByUrl('/tabs');
    }
  }
}