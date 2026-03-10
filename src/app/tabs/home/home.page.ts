import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  chatboxOutline,
  personOutline,
  statsChartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage {

  servicios = [
    { nombre: 'Mis Turnos',      icono: 'calendar-outline',    ruta: '/tabs/health' },
    { nombre: 'Comentarios',     icono: 'chatbox-outline',     ruta: '/tabs/comentario' },
    { nombre: 'Mi Perfil',       icono: 'person-outline',      ruta: '/tabs/profile' },
    { nombre: 'Estadísticas',    icono: 'stats-chart-outline', ruta: '/tabs/stats' },
  ];

  constructor(private router: Router) {
    addIcons({ calendarOutline, chatboxOutline, personOutline, statsChartOutline });
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
