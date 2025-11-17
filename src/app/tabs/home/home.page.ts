import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const supabase = createClient(
  environment.supabase.url,
  environment.supabase.anonKey
);

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class HomePage {

  nombreUsuario: string = '';

  turnosActivos: any[] = [];
  proximoTurno: any = null;
  turnosFuturos: any[] = [];
  historial: any[] = [];  // ← HISTORIAL AQUÍ

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.cargarUsuario();
    await this.cargarTurnos();
  }

  // Cargar nombre
  async cargarUsuario() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return;

    const { data } = await supabase
      .from('usuario')
      .select('nombre_usuario')
      .eq('email', auth.user.email)
      .single();

    if (data) this.nombreUsuario = data.nombre_usuario;
  }

  // Cargar turnos del usuario
  async cargarTurnos() {
    const { data, error } = await supabase
      .from('v_turnos_detalle')
      .select('*')
      .order('inicio', { ascending: true });

    if (error) return console.error(error);

    // Separar turnos activos (pendiente/confirmado/modificado) y cancelados/asistidos
    this.turnosActivos = data.filter(t =>
      t.estado !== 'cancelado' && t.asistido !== true
    );

    this.historial = data.filter(t =>
      t.estado === 'cancelado' || t.asistido === true
    );

    // SI NO HAY TURNOS ACTIVOS
    if (this.turnosActivos.length === 0) {
      this.proximoTurno = null;
      this.turnosFuturos = [];
      return;
    }

    // Asignar próximo turno
    this.proximoTurno = this.turnosActivos[0];

    // Turnos futuros excepto el primero
    this.turnosFuturos = this.turnosActivos.slice(1);
  }

  // Editar turno
  editarTurno(t: any) {
    this.router.navigate(['/tabs/stats'], {
      queryParams: { id_turno: t.id_turno }
    });
  }

  // Cancelar turno
  async cancelarTurno(t: any) {

    const alert = await this.alertCtrl.create({
      header: 'Cancelar turno',
      message: `¿Seguro que querés cancelar este turno?<br><br><b>${t.servicio}</b><br>${t.inicio}`,
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Sí, cancelar',
          role: 'destructive',
          handler: async () => {

            await supabase
              .from('turno')
              .update({ estado: 'cancelado' })
              .eq('id_turno', t.id_turno);

            await this.cargarTurnos();
          }
        }
      ]
    });

    await alert.present();
  }

  // Sacar turno
  nuevoTurno() {
    this.router.navigate(['/tabs/health']);
  }
}
