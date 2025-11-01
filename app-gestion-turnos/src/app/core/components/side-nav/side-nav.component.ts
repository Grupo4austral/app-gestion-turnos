import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  navigationItems = [
    { label: 'Comentarios', icon: 'chatbubbles' },
    { label: 'Configuración', icon: 'settings' },
    { label: 'Ayuda', icon: 'help-circle' }
  ];

  showLabels = true; // Cambiar a false para mostrar solo íconos

  toggleLabels() {
    this.showLabels = !this.showLabels;
  }
}