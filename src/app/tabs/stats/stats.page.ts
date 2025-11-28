import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
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
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatsPage {

  id_turno: number | null = null;

  servicio: string = '';
  prestador: string = '';

  fecha: string = '';
  hora: string = '';

  sucursales: string[] = [];
  sucursalSeleccionada: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.route.queryParams.subscribe(async params => {
      this.id_turno = params['id_turno'];
      if (this.id_turno) {
        await this.cargarTurno();
      }
    });
  }

  async cargarTurno() {
    const { data, error } = await supabase
      .from('v_turnos_detalle')
      .select('*')
      .eq('id_turno', this.id_turno)
      .single();

    if (error || !data) return;

    this.servicio = data.servicio;
    this.prestador = data.prestador;

    const inicio = new Date(data.inicio);
    this.fecha = inicio.toISOString().slice(0, 10);
    this.hora = inicio.toTimeString().slice(0, 5);

    // Cargar sucursales disponibles del servicio
    const { data: suc } = await supabase
      .from('prestador_sucursal')
      .select('direccion')
      .eq('prestador', data.prestador);

    this.sucursales = suc?.map(s => s.direccion) || [];
    this.sucursalSeleccionada = data.sucursal_direccion;
  }

  async guardarCambios() {
    const nuevaFecha = `${this.fecha}T${this.hora}:00`;

    await supabase
      .from('turno')
      .update({
        inicio: nuevaFecha,
        sucursal_direccion: this.sucursalSeleccionada
      })
      .eq('id_turno', this.id_turno);

    this.router.navigate(['/tabs/home']);
  }
}

