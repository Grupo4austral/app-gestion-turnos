// src/app/pages/productos/productos.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {

  constructor(private router: Router) {}

  servicios = [
    { nombre: 'Mecánica', icon: 'car-outline', route: '/tabs/health', imagen: 'assets/img/avatars/avatar1.svg'},
    { nombre: 'Peluquería', icon: 'cut-outline', route: '/tabs/health', imagen: 'assets/peluqueria.png' },
    { nombre: 'Veterinaria', icon: 'paw-outline', route: '/tabs/health', imagen: 'assets/img/avatars/avatar3.svg' },
    { nombre: 'Servicio', icon: 'construct-outline', route: '/tabs/capture', imagen: 'assets/img/avatars/avatar4.svg' },

  ];

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
