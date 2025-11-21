import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonicModule,
  AlertController,
  IonInput,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const supabase = createClient(
  environment.supabase.url,
  environment.supabase.anonKey
);

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class StatsPage {
  id_turno: number | null = null;

  servicio = '';
  prestador = '';
  estado = ''; // confirmado / pendiente / cancelado / asistido

  fecha = '';  // formato YYYY-MM-DD para el input date
  hora = '';   // formato HH:mm para el input time

  sucursalId: number | null = null;
  sucursales: { id_sucursal: number; nombre: string; direccion: string }[] = [];

  @ViewChild('fechaInput', { static: false }) fechaInput!: IonInput;
  @ViewChild('horaInput', { static: false }) horaInput!: IonInput;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.route.queryParams.subscribe(async (params) => {
      this.id_turno = params['id_turno']
        ? Number(params['id_turno'])
        : null;

      if (this.id_turno) {
        await this.cargarTurno();
        await this.cargarSucursales();
      }
    });
  }

  /** Cargar datos del turno para editar */
  async cargarTurno() {
    const { data, error } = await supabase
      .from('v_turnos_detalle')
      .select('id_turno, servicio, prestador, estado, inicio, id_sucursal, sucursal')
      .eq('id_turno', this.id_turno)
      .single();

    if (error || !data) {
      console.error('Error cargando turno', error);
      return;
    }

    this.servicio = data.servicio;
    this.prestador = data.prestador;
    this.estado = data.estado; // viene como texto completo
    this.sucursalId = data.id_sucursal ?? null;

    const fechaCompleta = new Date(data.inicio);
    this.fecha = fechaCompleta.toISOString().slice(0, 10);      // YYYY-MM-DD
    this.hora = fechaCompleta.toTimeString().slice(0, 5);       // HH:mm
  }

  /** Cargar listado de sucursales (para permitir cambiar la sede) */
  async cargarSucursales() {
    const { data, error } = await supabase
      .from('sucursal')
      .select('id_sucursal, nombre, direccion')
      .order('nombre', { ascending: true });

    if (error || !data) {
      console.error('Error cargando sucursales', error);
      return;
    }

    this.sucursales = data;

    // Si no hay sucursal asociada, tomamos la primera (por si acaso)
    if (this.sucursalId == null && this.sucursales.length > 0) {
      this.sucursalId = this.sucursales[0].id_sucursal;
    }
  }

  /** Etiqueta legible para la sucursal actual (cuando no hay select) */
  etiquetaSucursalActual(): string {
    const s = this.sucursales.find(
      (suc) => suc.id_sucursal === this.sucursalId
    );
    if (!s) return '';
    return `${s.nombre} — ${s.direccion}`;
  }

  /** Focar inputs al tocar toda la fila */
  focusFecha() {
    if (this.fechaInput) {
      this.fechaInput.setFocus();
    }
  }

  focusHora() {
    if (this.horaInput) {
      this.horaInput.setFocus();
    }
  }

  /** Guardar cambios en Supabase */
  async guardarCambios() {
    if (!this.id_turno) return;

    if (!this.fecha || !this.hora) {
      const alert = await this.alertCtrl.create({
        header: 'Faltan datos',
        message: 'Completá la fecha y la hora del turno.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Construimos el nuevo datetime en formato ISO
    const nuevaFecha = `${this.fecha}T${this.hora}:00`;

    const { error } = await supabase
      .from('turno')
      .update({
        inicio: nuevaFecha,
        id_sucursal: this.sucursalId, // permitimos cambiar la sucursal
        // NO actualizamos "estado" aquí, solo se muestra
      })
      .eq('id_turno', this.id_turno);

    if (error) {
      console.error('Error guardando turno', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No pudimos guardar los cambios. Intentá de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Volvemos a Home al guardar bien
    this.router.navigate(['/tabs/home']);
  }
}
