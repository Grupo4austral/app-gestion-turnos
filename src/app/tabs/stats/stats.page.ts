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

  // IDs reales
  id_servicio!: number;
  id_prestador!: number;
  id_sucursal!: number;

  servicios: any[] = [];
  prestadores: any[] = [];
  sucursales: any[] = [];

  fecha: string = '';
  hora: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.route.queryParams.subscribe(async params => {
      this.id_turno = params['id_turno'];
      if (this.id_turno) {
        await this.cargarListas();
        await this.cargarTurno();
      }
    });
  }

  async cargarListas() {
    const { data: serv } = await supabase.from('servicio').select('*');
    const { data: pres } = await supabase.from('prestador').select('*');
    const { data: suc } = await supabase.from('sucursal').select('*');

    this.servicios = serv || [];
    this.prestadores = pres || [];
    this.sucursales = suc || [];
  }

  async cargarTurno() {
    const { data, error } = await supabase
      .from('turno')
      .select('*')
      .eq('id_turno', this.id_turno)
      .single();

    if (error || !data) return;

    this.id_servicio = data.id_servicio;
    this.id_prestador = data.id_prestador;
    this.id_sucursal = data.id_sucursal;

    const inicio = new Date(data.inicio);
    this.fecha = inicio.toISOString().slice(0, 10);
    this.hora = inicio.toTimeString().slice(0, 5);
  }

  async guardarCambios() {
    const inicioLocal = new Date(`${this.fecha}T${this.hora}:00`);
    const finLocal = new Date(inicioLocal.getTime() + 60 * 60 * 1000);

    const { error } = await supabase
      .from('turno')
      .update({
        id_servicio: this.id_servicio,
        id_prestador: this.id_prestador,
        id_sucursal: this.id_sucursal,
        inicio: inicioLocal.toISOString(),
        fin: finLocal.toISOString()
      })
      .eq('id_turno', this.id_turno);

    if (error) {
      console.error("UPDATE ERROR:", error);
      return;
    }

    this.router.navigate(['/tabs/home']);
  }
}