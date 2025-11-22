import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  nombreUsuario = '';
  turnosActivos: any[] = [];
  proximoTurno: any = null;
  turnosFuturos: any[] = [];
  historial: any[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.cargarUsuario();
    await this.cargarTurnos();
  }

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

 async cargarTurnos() {
  const { data, error } = await supabase
    .from('v_turnos_detalle')
    .select('*')
    .order('inicio', { ascending: true });

  if (error) return console.error(error);

  const ahora = new Date();

  // =============== TURNOS ACTIVOS (futuros) ===============
  this.turnosActivos = data.filter(t =>
    t.estado !== 'c' &&                   // no cancelados
    new Date(t.inicio) > ahora            // fecha futura
  );

  // =============== HISTORIAL (pasados o cancelados) ===============
this.historial = data
  .filter(t =>
    t.estado === 'c' ||               // cancelados abreviados
    t.estado === 'cancelado' ||       // cancelados normales
    new Date(t.inicio) <= ahora       // pasó la fecha
  )
  .map(t => {

    const inicio = new Date(t.inicio);

    // 1️⃣ Cancelado
    if (t.estado === 'c' || t.estado === 'cancelado') {
      return { ...t, estado: 'cancelado' };
    }

    // 2️⃣ Pasó la fecha → Asistido SI O SI
    if (inicio <= ahora) {
      return { ...t, estado: 'asistido' };
    }

    // 3️⃣ Cualquier cosa rara → Confirmado
    return { ...t, estado: 'confirmado' };
  });


  // =============== MANEJO DE PROXIMO / FUTUROS ===============
  if (this.turnosActivos.length === 0) {
    this.proximoTurno = null;
    this.turnosFuturos = [];
    return;
  }

  this.proximoTurno = this.turnosActivos[0];
  this.turnosFuturos = this.turnosActivos.slice(1);
}

  editarTurno(turno: any) {
    this.router.navigate(['/tabs/stats'], {
      queryParams: { id_turno: turno.id_turno }
    });
  }

  async cancelarTurno(t: any) {
    const fecha = new Date(t.inicio).toLocaleString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });

    const alert = await this.alertCtrl.create({
      header: 'Cancelar turno',
      message: `¿Querés cancelar el turno de ${t.servicio}?${fecha}`,
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

  abrirMapa(direccion: string) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    window.open(url, '_blank');
  }

  nuevoTurno() {
    this.router.navigate(['/tabs/health']);
  }
}
