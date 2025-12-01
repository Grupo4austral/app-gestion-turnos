# **TAB DE COMENTARIOS - GUÍA COMPLETA CON CÓDIGO EXPLICADO**

---

## **📄 ARCHIVO: `comentario.page.html`**
### **Estructura visual de la página**

```html
<ion-header>
  <!-- Cabecera de la página con fondo azul (primary) -->
  <ion-toolbar color="primary">
    <!-- Título que aparece arriba -->
    <ion-title>Comentarios</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <!-- Contenido principal con espaciado interno -->

  <!-- ========== SECCIÓN 1: CREAR NUEVO COMENTARIO ========== -->
  <!-- Solo se muestra si NO estás editando (*ngIf="!editando") -->
  <ion-card *ngIf="!editando">
    <ion-card-header>
      <ion-card-title>Nuevo Comentario</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      
      <!-- Campo 1: Comentario principal -->
      <ion-item>
        <ion-label position="stacked">Comentario</ion-label>
        <!-- Área de texto grande, vinculada a nuevoComentario.comentario con [(ngModel)] -->
        <ion-textarea [(ngModel)]="nuevoComentario.comentario" placeholder="Escribí tu comentario..."></ion-textarea>
      </ion-item>

      <!-- Campo 2: Descripción opcional -->
      <ion-item>
        <ion-label position="stacked">Descripción</ion-label>
        <!-- Campo de texto simple, vinculado a nuevoComentario.descripcion -->
        <ion-input [(ngModel)]="nuevoComentario.descripcion" placeholder="Detalles opcionales"></ion-input>
      </ion-item>

      <!-- Campo 3: Puntuación de 1 a 5 -->
      <ion-item>
        <ion-label position="stacked">Puntuación</ion-label>
        <!-- Deslizador de 1 a 5 con pasos de 1, vinculado a nuevoComentario.puntuacion -->
        <ion-range min="1" max="5" step="1" snaps="true" [(ngModel)]="nuevoComentario.puntuacion">
          <ion-label slot="start">1</ion-label>
          <ion-label slot="end">5</ion-label>
        </ion-range>
      </ion-item>

      <!-- Botón para guardar -->
      <ion-button expand="block" color="success" (click)="guardarComentario()">
        <!-- (click)="guardarComentario()" ejecuta la función al hacer clic -->
        <ion-icon name="add-circle-outline" slot="start"></ion-icon>
        Guardar comentario
      </ion-button>
    </ion-card-content>
  </ion-card>

  <!-- ========== SECCIÓN 2: EDITAR COMENTARIO ========== -->
  <!-- Solo se muestra si estás editando un comentario (*ngIf="editando") -->
  <ion-card *ngIf="editando">
    <ion-card-header>
      <ion-card-title>Editar Comentario</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      
      <!-- Mismos campos pero vinculados a "editando" en vez de "nuevoComentario" -->
      <ion-item>
        <ion-label position="stacked">Comentario</ion-label>
        <ion-textarea [(ngModel)]="editando.comentario"></ion-textarea>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Descripción</ion-label>
        <ion-input [(ngModel)]="editando.descripcion"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Puntuación</ion-label>
        <ion-range min="1" max="5" step="1" snaps="true" [(ngModel)]="editando.puntuacion">
          <ion-label slot="start">1</ion-label>
          <ion-label slot="end">5</ion-label>
        </ion-range>
      </ion-item>

      <!-- Botón para actualizar -->
      <ion-button expand="block" color="primary" (click)="actualizarComentario()">
        <ion-icon name="save-outline" slot="start"></ion-icon>
        Actualizar
      </ion-button>

      <!-- Botón para cancelar edición -->
      <ion-button expand="block" color="medium" (click)="editando = null">
        <!-- (click)="editando = null" limpia la variable y sale del modo edición -->
        <ion-icon name="close-outline" slot="start"></ion-icon>
        Cancelar
      </ion-button>
    </ion-card-content>
  </ion-card>

  <!-- ========== SECCIÓN 3: LISTA DE COMENTARIOS ========== -->
  <ion-list>
    <ion-list-header>
      <ion-label>Comentarios recientes</ion-label>
    </ion-list-header>

    <!-- Barra de búsqueda -->
    <ion-searchbar 
      [(ngModel)]="searchTerm" 
      (ionInput)="filtrarComentarios()"
      <!-- (ionInput) ejecuta filtrarComentarios() cada vez que escribís -->
      placeholder="Buscar comentarios..."
      showClearButton="always">
    </ion-searchbar>

    <!-- Spinner de carga (girando) -->
    <!-- Se muestra solo cuando isLoading es true -->
    <div *ngIf="isLoading" class="ion-text-center ion-padding">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      <p>Cargando comentarios...</p>
    </div>

    <!-- Mensaje si no hay resultados de búsqueda -->
    <ion-item *ngIf="!isLoading && comentariosFiltrados.length === 0 && searchTerm" lines="none">
      <ion-label class="ion-text-center">
        <p style="color: var(--ion-color-medium);">No se encontraron comentarios con "{{ searchTerm }}"</p>
      </ion-label>
    </ion-item>

    <!-- Mensaje si no hay comentarios en la base de datos -->
    <ion-item *ngIf="!isLoading && comentarios.length === 0 && !searchTerm" lines="none">
      <ion-label class="ion-text-center">
        <p style="color: var(--ion-color-medium);">No hay comentarios aún</p>
        <p style="color: var(--ion-color-medium); font-size: 0.9em;">¡Sé el primero en comentar!</p>
      </ion-label>
    </ion-item>

    <!-- Lista de comentarios -->
    <!-- *ngFor recorre cada comentario en comentariosFiltrados -->
    <ion-item *ngFor="let c of comentariosFiltrados">
      <ion-label>
        <!-- h2: Texto del comentario -->
        <h2>{{ c.comentario }}</h2>
        <!-- p: Descripción (solo si existe) -->
        <p *ngIf="c.descripcion">{{ c.descripcion }}</p>
        <!-- p: Puntuación y fecha formateada -->
        <p>⭐ {{ c.puntuacion }} — {{ c.fecha_comentario | date:'short' }}</p>
      </ion-label>
      <!-- Botones a la derecha -->
      <ion-buttons slot="end">
        <!-- Botón editar -->
        <ion-button color="primary" (click)="editar(c)">
          <!-- (click)="editar(c)" carga el comentario c en el formulario de edición -->
          <ion-icon slot="icon-only" name="create-outline"></ion-icon>
        </ion-button>
        <!-- Botón eliminar -->
        <ion-button color="danger" (click)="eliminarComentario(c.id_comentario!)">
          <!-- (click)="eliminarComentario(...)" borra el comentario después de confirmar -->
          <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-item>
  </ion-list>
</ion-content>
```

---

## **💻 ARCHIVO: `comentario.page.ts`**
### **Lógica de la página**

```typescript
// ========== IMPORTACIONES ==========
import { Component, OnInit, OnDestroy } from '@angular/core';
// Component: decorador para crear un componente
// OnInit: interfaz que requiere implementar ngOnInit() (se ejecuta al iniciar)
// OnDestroy: interfaz que requiere implementar ngOnDestroy() (se ejecuta al destruir)

import { CommonModule } from '@angular/common';
// CommonModule: proporciona directivas comunes como *ngIf, *ngFor

import { FormsModule } from '@angular/forms';
// FormsModule: permite usar [(ngModel)] para vincular datos con formularios

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonItem, IonLabel, IonTextarea, IonInput,
  IonRange, IonButton, IonIcon, IonList, IonListHeader, IonButtons,
  IonSpinner, IonSearchbar, AlertController, ToastController
} from '@ionic/angular/standalone';
// Todos los componentes de Ionic que se usan en el template

import { addIcons } from 'ionicons';
import {
  addCircleOutline, saveOutline, closeOutline,
  createOutline, trashOutline
} from 'ionicons/icons';
// Íconos que se usan en los botones

import { DatabaseService } from '../../services/database';
// Servicio para interactuar con la base de datos (Supabase)

import { AnalyticsService } from '../../services/analytics.service';
// Servicio para registrar eventos y métricas

import { Comentario } from '../../models';
// Interfaz TypeScript que define la estructura de un comentario

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// Subject y takeUntil: para manejar suscripciones y limpiar memoria


// ========== DECORADOR DEL COMPONENTE ==========
@Component({
  selector: 'app-comentario',  // Selector HTML para usar este componente
  standalone: true,            // Componente independiente (Angular 16+)
  templateUrl: './comentario.page.html',  // Archivo HTML de la vista
  styleUrls: ['./comentario.page.scss'],  // Archivo de estilos
  imports: [                   // Módulos y componentes que usa este componente
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonItem, IonLabel, IonTextarea, IonInput,
    IonRange, IonButton, IonIcon, IonList, IonListHeader, IonButtons,
    IonSpinner, IonSearchbar
  ]
})

// ========== CLASE DEL COMPONENTE ==========
export class ComentarioPage implements OnInit, OnDestroy {
  // VARIABLES DE ESTADO
  comentarios: Comentario[] = [];              // Todos los comentarios de la BD
  comentariosFiltrados: Comentario[] = [];     // Comentarios después de buscar
  
  nuevoComentario: Partial<Comentario> = {     // Datos del formulario nuevo
    comentario: '',        // Texto principal
    titulo: '',           // Campo legacy
    descripcion: '',      // Detalles opcionales
    puntuacion: 5,        // Puntuación por defecto
    categoria: 'general', // Campo legacy
    prioridad: 'media',   // Campo legacy
    estado: 'pendiente'   // Campo legacy
  };
  
  editando: Comentario | null = null;  // Comentario que se está editando (null = no hay)
  userId: string = '';                  // ID del usuario actual logueado
  isLoading = false;                    // Estado de carga (para spinner)
  searchTerm: string = '';              // Término de búsqueda
  
  private destroy$ = new Subject<void>();  // Para limpiar suscripciones

  // ========== CONSTRUCTOR ==========
  constructor(
    private db: DatabaseService,           // Inyecta servicio de base de datos
    private alertCtrl: AlertController,    // Inyecta controlador de alertas
    private analytics: AnalyticsService,   // Inyecta servicio de analytics
    private toastController: ToastController  // Inyecta controlador de mensajes toast
  ) {
    // Registra los íconos para poder usarlos en el template
    addIcons({
      addCircleOutline,
      saveOutline,
      closeOutline,
      createOutline,
      trashOutline
    });
  }

  // ========== CICLO DE VIDA: INICIALIZACIÓN ==========
  async ngOnInit() {
    // Registra en analytics que el usuario vio esta página
    this.analytics.trackPageView('comentarios', '/tabs/comentario');
    
    // Obtiene el usuario actual desde el servicio de base de datos
    const user = await this.db.getUser();
    this.userId = user?.id || '';  // Guarda el ID o string vacío si no hay usuario
    
    // Se suscribe a cambios del usuario (por si se loguea/desloguea)
    this.db.currentUser$
      .pipe(takeUntil(this.destroy$))  // Se desuscribe automáticamente al destruir
      .subscribe(user => {
        this.userId = user?.id || '';  // Actualiza el userId cuando cambia
      });
    
    // Carga todos los comentarios de la base de datos
    await this.cargarComentarios();
  }

  // ========== CICLO DE VIDA: DESTRUCCIÓN ==========
  ngOnDestroy() {
    // Emite señal para cancelar todas las suscripciones
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ========== CARGAR COMENTARIOS ==========
  async cargarComentarios() {
    this.isLoading = true;  // Activa el spinner de carga
    try {
      // Obtiene todos los comentarios de la tabla 'comentario'
      this.comentarios = await this.db.getAll<Comentario>('comentario', {
        orderBy: 'fecha_comentario',  // Ordena por fecha
        ascending: false              // De más reciente a más antiguo
      });
      
      // Copia los comentarios al array filtrado
      this.comentariosFiltrados = [...this.comentarios];
      
      // Aplica filtro si hay término de búsqueda
      this.filtrarComentarios();
      
      // Registra evento en analytics
      this.analytics.logEvent('comentarios_cargados', {
        cantidad: this.comentarios.length
      });
    } catch (error) {
      console.error('Error al cargar comentarios', error);
      await this.mostrarToast('Error al cargar comentarios', 'danger');
    } finally {
      this.isLoading = false;  // Desactiva el spinner
    }
  }

  // ========== FILTRAR COMENTARIOS ==========
  filtrarComentarios() {
    // Si no hay término de búsqueda, muestra todos
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.comentariosFiltrados = [...this.comentarios];
    } else {
      // Convierte el término a minúsculas para búsqueda case-insensitive
      const term = this.searchTerm.toLowerCase();
      
      // Filtra comentarios que contengan el término en título o descripción
      this.comentariosFiltrados = this.comentarios.filter(c =>
        c.titulo?.toLowerCase().includes(term) ||
        (c.descripcion && c.descripcion.toLowerCase().includes(term))
      );
    }
  }

  // ========== LIMPIAR BÚSQUEDA ==========
  limpiarBusqueda() {
    this.searchTerm = '';          // Limpia el término
    this.filtrarComentarios();     // Muestra todos los comentarios
  }

  // ========== GUARDAR NUEVO COMENTARIO ==========
  async guardarComentario() {
    // Validación: verifica que haya texto en el comentario
    if (!this.nuevoComentario.comentario?.trim() && !this.nuevoComentario.titulo?.trim()) {
      await this.mostrarToast('El comentario es requerido', 'warning');
      return;  // Sale de la función sin guardar
    }

    this.isLoading = true;  // Activa spinner
    try {
      // Verifica que el usuario esté logueado
      if (!this.userId) {
        await this.mostrarToast('Debes iniciar sesión para comentar', 'warning');
        return;
      }

      // Prepara los datos a insertar (solo campos que existen en la BD)
      const nuevoComentarioData = {
        comentario: this.nuevoComentario.comentario || '',
        descripcion: this.nuevoComentario.descripcion || '',
        puntuacion: this.nuevoComentario.puntuacion || 5,
        usuario_id: this.userId  // Vincula el comentario al usuario actual
      };

      console.log('Insertando comentario:', nuevoComentarioData);

      // Inserta en la base de datos
      const resultado = await this.db.insert<Comentario>('comentario', nuevoComentarioData);

      // Verifica que se haya insertado correctamente
      if (!resultado) {
        throw new Error('No se pudo crear el comentario');
      }
      
      // Registra eventos en analytics
      this.analytics.trackComentarioCreated(5);
      this.analytics.logEvent('comentario_creado', {
        categoria: this.nuevoComentario.categoria
      });
      
      // Limpia el formulario
      this.nuevoComentario = { 
        comentario: '',
        titulo: '', 
        descripcion: '',
        puntuacion: 5,
        categoria: 'general',
        prioridad: 'media',
        estado: 'pendiente'
      };
      
      // Muestra mensaje de éxito
      await this.mostrarToast('Comentario creado exitosamente', 'success');
      
      // Recarga la lista de comentarios
      await this.cargarComentarios();
    } catch (error: any) {
      // Manejo de errores con logging detallado
      console.error('Error completo al guardar comentario:', error);
      console.error('Error details:', {
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        code: error?.code
      });
      
      // Muestra el error al usuario
      const errorMsg = error?.message || error?.details || error?.hint || 'Error desconocido';
      await this.mostrarToast(`Error al guardar: ${errorMsg}`, 'danger');
    } finally {
      this.isLoading = false;  // Desactiva spinner
    }
  }

  // ========== ENTRAR EN MODO EDICIÓN ==========
  editar(c: Comentario) {
    // Copia el comentario seleccionado a la variable editando
    this.editando = { ...c };  // Spread operator para crear una copia
  }

  // ========== CANCELAR EDICIÓN ==========
  cancelarEdicion() {
    this.editando = null;  // Limpia la variable, sale del modo edición
  }

  // ========== ACTUALIZAR COMENTARIO ==========
  async actualizarComentario() {
    // Obtiene el ID del comentario a actualizar
    const updateId = this.editando?.id_comentario || this.editando?.id;
    
    // Validación: verifica que haya un comentario para actualizar
    if (!updateId) {
      await this.mostrarToast('No hay comentario para actualizar', 'warning');
      return;
    }

    // Verifica que el usuario esté logueado
    if (!this.userId) {
      await this.mostrarToast('Debes iniciar sesión', 'warning');
      return;
    }

    this.isLoading = true;  // Activa spinner
    try {
      // Actualiza en la base de datos
      await this.db.update<Comentario>(
        'comentario',              // Nombre de la tabla
        updateId,                  // ID del comentario
        {                          // Datos a actualizar
          comentario: this.editando?.comentario,
          descripcion: this.editando?.descripcion,
          puntuacion: this.editando?.puntuacion
        },
        'id_comentario'            // Nombre de la columna de ID
      );
      
      // Registra en analytics
      this.analytics.logEvent('comentario_actualizado', { id: updateId });
      
      // Muestra mensaje de éxito
      await this.mostrarToast('Comentario actualizado', 'success');
      
      // Sale del modo edición
      this.editando = null;
      
      // Recarga la lista
      await this.cargarComentarios();
    } catch (error) {
      console.error('Error al actualizar', error);
      await this.mostrarToast('Error al actualizar comentario', 'danger');
    } finally {
      this.isLoading = false;  // Desactiva spinner
    }
  }

  // ========== ELIMINAR COMENTARIO ==========
  async eliminarComentario(id?: number) {
    if (!id) return;  // Sale si no hay ID

    // Crea una alerta de confirmación
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Deseás eliminar este comentario?',
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel'  // Botón que cierra sin hacer nada
        },
        {
          text: 'Eliminar',
          role: 'destructive',  // Estilo rojo/peligroso
          handler: async () => {
            this.isLoading = true;  // Activa spinner
            try {
              // Elimina de la base de datos
              await this.db.delete('comentario', id, 'id_comentario');
              
              // Registra en analytics
              this.analytics.logEvent('comentario_eliminado', { id });
              
              // Muestra mensaje de éxito
              await this.mostrarToast('Comentario eliminado', 'success');
              
              // Recarga la lista
              await this.cargarComentarios();
            } catch (error) {
              console.error('Error al eliminar', error);
              await this.mostrarToast('Error al eliminar comentario', 'danger');
            } finally {
              this.isLoading = false;  // Desactiva spinner
            }
          },
        },
      ],
    });
    
    // Muestra la alerta
    await alert.present();
  }

  // ========== MOSTRAR MENSAJE TOAST ==========
  private async mostrarToast(message: string, color: string) {
    // Crea un mensaje emergente temporal
    const toast = await this.toastController.create({
      message,              // Texto a mostrar
      duration: 2000,       // 2 segundos
      color,                // success, danger, warning, etc.
      position: 'bottom',   // Posición en pantalla
    });
    await toast.present();  // Muestra el toast
  }

  // ========== FUNCIONES AUXILIARES (NO USADAS ACTUALMENTE) ==========
  getPrioridadColor(prioridad?: string): string {
    // Devuelve un color según la prioridad
    switch (prioridad) {
      case 'alta': return 'danger';
      case 'media': return 'warning';
      case 'baja': return 'success';
      default: return 'medium';
    }
  }

  getEstadoColor(estado?: string): string {
    // Devuelve un color según el estado
    switch (estado) {
      case 'completado': return 'success';
      case 'en_proceso': return 'warning';
      case 'pendiente': return 'medium';
      default: return 'medium';
    }
  }
}
```

---

## **🎨 ARCHIVO: `comentario.page.scss`**
### **Estilos CSS**

```scss
ion-card {
  margin-bottom: 16px;  // Espacio de 16px debajo de cada tarjeta (card)
}

ion-button {
  margin-top: 10px;     // Espacio de 10px arriba de cada botón
}

ion-item {
  --padding-start: 0;   // Elimina el padding izquierdo de los items
}

ion-range {
  padding: 10px 0;      // Añade 10px de padding arriba y abajo del deslizador
}
```

---

## **🧪 ARCHIVO: `comentario.page.spec.ts`**
### **Pruebas unitarias**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
// ComponentFixture: herramienta para probar componentes
// TestBed: entorno de pruebas de Angular

import { ComentarioPage } from './comentario.page';

// Describe: agrupa las pruebas del componente ComentarioPage
describe('ComentarioPage', () => {
  let component: ComentarioPage;           // Instancia del componente
  let fixture: ComponentFixture<ComentarioPage>;  // Fixture para testing

  // beforeEach: se ejecuta antes de cada prueba
  beforeEach(() => {
    // Crea el componente en el entorno de pruebas
    fixture = TestBed.createComponent(ComentarioPage);
    component = fixture.componentInstance;  // Obtiene la instancia
    fixture.detectChanges();                // Detecta cambios (ejecuta ngOnInit)
  });

  // it: define una prueba individual
  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();  // Debe ser truthy (no null, undefined, false)
  });
});
```

---

## **📊 RESUMEN GENERAL**

### **¿Qué hace la Tab de Comentarios?**
Es una página donde los usuarios pueden **escribir, ver, editar y eliminar comentarios** con puntuaciones (como reseñas o feedback). Piensa en ella como un sistema de reseñas o feedback de usuarios.

---

### **Componentes principales:**

#### **1. Formulario para crear comentarios**
- **Comentario**: Campo de texto grande para escribir el comentario principal
- **Descripción**: Campo opcional para agregar más detalles
- **Puntuación**: Un deslizador de 1 a 5 estrellas
- **Botón "Guardar comentario"**: Guarda el nuevo comentario en la base de datos

#### **2. Formulario para editar**
- Aparece cuando hacés clic en el botón de editar (✏️) de un comentario existente
- Tiene los mismos campos pero con los datos precargados
- Botones: "Actualizar" (guarda cambios) y "Cancelar" (cierra sin guardar)

#### **3. Lista de comentarios**
- Muestra todos los comentarios guardados
- Cada comentario muestra:
  - El texto del comentario
  - La descripción (si la tiene)
  - La puntuación (⭐) y la fecha
  - Botones para editar (✏️) y eliminar (🗑️)

#### **4. Buscador**
- Permite buscar comentarios por texto
- Filtra en tiempo real mientras escribís

---

### **Flujo completo de la aplicación:**

1. **Inicio** → `ngOnInit()` carga usuario y comentarios de la base de datos
2. **Usuario escribe** → Datos vinculados automáticamente con `[(ngModel)]`
3. **Guardar** → `guardarComentario()` inserta en BD → Recarga lista
4. **Buscar** → `filtrarComentarios()` filtra localmente (sin consultar la BD otra vez)
5. **Editar** → `editar(c)` carga datos en formulario → `actualizarComentario()` guarda cambios
6. **Eliminar** → `eliminarComentario()` muestra alerta de confirmación → Borra de BD

---

### **¿Cómo funciona internamente?**

#### **Al iniciar la página (ngOnInit):**
1. Registra en analytics que entraste a esta página
2. Obtiene el usuario actual que está logueado
3. Se suscribe a cambios del usuario (por si se loguea/desloguea durante el uso)
4. Carga todos los comentarios de la base de datos
5. Los ordena por fecha (más recientes primero)

#### **Al guardar un comentario (guardarComentario):**
1. Valida que hayas escrito algo (no vacío)
2. Verifica que estés logueado
3. Prepara los datos a enviar:
   - Tu comentario
   - La descripción (opcional)
   - La puntuación (1-5)
   - Tu ID de usuario (para saber quién escribió el comentario)
4. Inserta en la tabla `comentario` de Supabase
5. Si todo va bien:
   - Limpia el formulario
   - Muestra mensaje de éxito (toast verde)
   - Recarga la lista para mostrar el nuevo comentario
6. Si hay error:
   - Muestra el error en consola con todos los detalles
   - Muestra mensaje de error al usuario (toast rojo)

#### **Al editar (editar + actualizarComentario):**
1. `editar(c)` → Copia el comentario seleccionado a la variable `editando`
2. El HTML detecta que `editando` no es null y muestra el formulario de edición
3. Usuario modifica los campos
4. `actualizarComentario()` → Envía solo los campos modificados a la BD
5. Usa `id_comentario` para identificar cuál comentario actualizar
6. Limpia `editando` (vuelve al modo crear)
7. Recarga la lista

#### **Al eliminar (eliminarComentario):**
1. Muestra una alerta de confirmación con dos botones:
   - **Cancelar**: No hace nada, cierra la alerta
   - **Eliminar**: Ejecuta el borrado
2. Si confirmás:
   - Borra el comentario de la BD usando su `id_comentario`
   - Muestra mensaje de éxito
   - Recarga la lista
3. Registra el evento en analytics

#### **Búsqueda (filtrarComentarios):**
- **Sin término de búsqueda**: Muestra todos los comentarios
- **Con término**: 
  - Convierte el término a minúsculas
  - Filtra localmente (no consulta la BD)
  - Busca coincidencias en `titulo` y `descripcion`
  - Actualiza `comentariosFiltrados` (el array que se muestra en pantalla)
- Si no hay coincidencias → Muestra mensaje "No se encontraron comentarios"

---

### **Estados visuales:**

| Estado | Qué se muestra |
|--------|---------------|
| **Cargando** | Spinner girando + texto "Cargando comentarios..." |
| **Sin comentarios** | Mensaje motivacional "No hay comentarios aún - ¡Sé el primero en comentar!" |
| **Sin resultados de búsqueda** | Mensaje "No se encontraron comentarios con 'término'" |
| **Modo normal** | Formulario nuevo + lista de comentarios |
| **Modo edición** | Oculta formulario nuevo, muestra formulario de edición |

---

### **Base de datos (Supabase):**

**Tabla: `comentario`**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_comentario` | number | ID único (primary key) |
| `comentario` | string | Texto del comentario |
| `descripcion` | string | Detalles adicionales (opcional) |
| `fecha_comentario` | timestamp | Fecha de creación (auto) |
| `puntuacion` | number | Calificación de 1 a 5 |
| `usuario_id` | string | ID del usuario que comentó (FK) |

---

### **Operaciones CRUD:**

- **C**reate: `db.insert('comentario', datos)` → Crea nuevo comentario
- **R**ead: `db.getAll('comentario', opciones)` → Lee todos los comentarios
- **U**pdate: `db.update('comentario', id, datos)` → Actualiza comentario existente
- **D**elete: `db.delete('comentario', id)` → Elimina comentario

---

### **Seguridad:**

- ✅ Solo usuarios logueados pueden crear comentarios
- ✅ Se valida que `userId` exista antes de insertar
- ✅ Confirmación antes de eliminar (evita borrados accidentales)
- ✅ Manejo de errores robusto con logging detallado

---

### **User Experience (UX):**

- ✅ **Feedback inmediato**: Mensajes toast después de cada acción
- ✅ **Estados de carga**: Spinner mientras se cargan/guardan datos
- ✅ **Validaciones claras**: Mensajes específicos si falta algo
- ✅ **Búsqueda en tiempo real**: Filtra mientras escribís
- ✅ **Confirmación destructiva**: Alerta antes de eliminar
- ✅ **Formularios reactivos**: Two-way binding con `[(ngModel)]`
- ✅ **Estados vacíos**: Mensajes útiles cuando no hay datos

---

### **Analytics:**

Registra estos eventos:
- 📊 `trackPageView('comentarios')` → Usuario entra a la página
- 📊 `logEvent('comentarios_cargados')` → Se cargan comentarios con cantidad
- 📊 `trackComentarioCreated(5)` → Usuario crea comentario
- 📊 `logEvent('comentario_creado')` → Detalles del comentario creado
- 📊 `logEvent('comentario_actualizado')` → Usuario edita comentario
- 📊 `logEvent('comentario_eliminado')` → Usuario borra comentario

---

### **Tecnologías utilizadas:**

| Tecnología | Uso |
|-----------|-----|
| **Angular** | Framework principal del frontend |
| **Ionic** | Componentes UI móvil (cards, buttons, etc.) |
| **TypeScript** | Lenguaje tipado para código más seguro |
| **RxJS** | Programación reactiva con Observables |
| **Supabase** | Backend as a Service (PostgreSQL + Auth) |
| **SCSS** | CSS mejorado con variables y nesting |
| **Jasmine/Karma** | Testing unitario |

---

### **Patrones de diseño aplicados:**

1. **Component-Based Architecture**: Todo es un componente reutilizable
2. **Reactive Programming**: Uso de Observables para datos en tiempo real
3. **Two-Way Data Binding**: `[(ngModel)]` sincroniza vista y modelo
4. **Dependency Injection**: Servicios inyectados en el constructor
5. **Separation of Concerns**: HTML (vista), TS (lógica), SCSS (estilos)
6. **Error Handling**: Try-catch con mensajes específicos
7. **Memory Management**: `takeUntil` + `ngOnDestroy` para limpiar suscripciones

---

### **Funcionalidades clave:**

✅ **CRUD completo** (Crear, Leer, Actualizar, Eliminar)  
✅ **Búsqueda en tiempo real** con filtrado local  
✅ **Validaciones de usuario** logueado  
✅ **Mensajes de feedback** (toast) después de cada acción  
✅ **Confirmación antes de eliminar** (alerta)  
✅ **Analytics integrado** para métricas  
✅ **Estados de carga visuales** (spinner)  
✅ **Formularios reactivos** con two-way binding  
✅ **Manejo robusto de errores** con logging detallado  
✅ **Responsive design** con Ionic  

---

## **🚀 Resumen en 3 líneas:**

La **Tab de Comentarios** permite a usuarios logueados crear reseñas con texto, descripción y puntuación (1-5 estrellas). Incluye búsqueda en tiempo real, edición/eliminación con confirmación, y manejo completo de errores con feedback visual inmediato. Usa Angular + Ionic + Supabase con operaciones CRUD completas y analytics integrado.
