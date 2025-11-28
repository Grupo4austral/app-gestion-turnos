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

  // ============================
  // AL ENTRAR A LA SCREEN
  // ============================
  async ionViewWillEnter() {
    await this.cargarUsuario();
    await this.cargarTurnos();
  }

  // ============================
  // CARGAR USUARIO + DEBUG
  // ============================
  async cargarUsuario() {
    const { data: auth } = await supabase.auth.getUser();

    console.log("📌 Usuario autenticado:", auth?.user);

    if (!auth?.user) {
      console.log("⚠ No hay usuario logueado");
      return;
    }

    const email = auth.user.email;
    console.log("📌 Email del usuario:", email);

    const { data, error } = await supabase
      .from('usuario')
      .select('nombre_usuario, email')
      .eq('email', email)
      .single();

    console.log("📌 Resultado consulta tabla usuario:", data, error);

    if (data?.nombre_usuario) {
      this.nombreUsuario = data.nombre_usuario;
    } else {
      console.log("⚠ No se encontró el nombre en la tabla usuario.");
    }
  }

  // ============================
  // CARGAR TURNOS
  // ============================
  async cargarTurnos() {
    const { data, error } = await supabase
      .from('v_turnos_detalle')
      .select('*')
      .order('inicio', { ascending: true });

    if (error) {
      console.error("❌ Error cargando turnos:", error);
      return;
    }

    const ahora = new Date();

    // --- TURNOS FUTUROS (NO cancelados) ---
    this.turnosActivos = data.filter(t =>
      t.estado !== 'c' &&
      t.estado !== 'cancelado' &&
      new Date(t.inicio) > ahora
    );

    // --- HISTORIAL ---
    this.historial = data
      .filter(t =>
        t.estado === 'c' ||
        t.estado === 'cancelado' ||
        new Date(t.inicio) <= ahora
      )
      .map(t => {

        const inicio = new Date(t.inicio);

        if (t.estado === 'c' || t.estado === 'cancelado') {
          return { ...t, estado: 'cancelado' };
        }

        if (inicio <= ahora) {
          return { ...t, estado: 'asistido' };
        }

        return { ...t, estado: 'confirmado' };
      });

    // --- PROXIMO Y FUTUROS ---
    if (this.turnosActivos.length === 0) {
      this.proximoTurno = null;
      this.turnosFuturos = [];
      return;
    }

    this.proximoTurno = this.turnosActivos[0];
    this.turnosFuturos = this.turnosActivos.slice(1);
  }

  // ============================
  // EDITAR TURNO
  // ============================
  editarTurno(turno: any) {
    this.router.navigate(['/tabs/stats'], {
      queryParams: { id_turno: turno.id_turno }
    });
  }

  // ============================
  // CANCELAR TURNO
  // ============================
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

  // ============================
  // ABRIR MAPS
  // ============================
  abrirMapa(direccion: string) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    window.open(url, '_blank');
  }

  nuevoTurno() {
    this.router.navigate(['/tabs/health']);
  }
}
