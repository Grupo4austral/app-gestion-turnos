# 📝 Explicación Simple de la Tab de Comentarios

## 🎯 ¿Qué hace esta página?

La página de comentarios permite a los usuarios:
- ✍️ Crear nuevos comentarios con puntuación (1-5 estrellas)
- ✏️ Editar comentarios existentes
- 🗑️ Eliminar comentarios
- 🔍 Buscar comentarios por texto

---

## 📄 ARCHIVO: comentario.page.html (La Vista)

Este archivo define **CÓMO SE VE** la página en pantalla.

### 🔵 Componentes Ion (Ionic) Explicados:

#### 1. **`<ion-header>`** - Cabecera de la página
```html
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Comentarios</ion-title>
  </ion-toolbar>
</ion-header>
```
- **`ion-header`**: Barra superior fija que no se mueve al hacer scroll
- **`ion-toolbar`**: Contenedor dentro del header para botones y título
- **`color="primary"`**: Aplica el color primario de tu tema (generalmente azul)
- **`ion-title`**: El título que se muestra en la barra superior

---

#### 2. **`<ion-content>`** - Contenido principal
```html
<ion-content class="ion-padding">
```
- **`ion-content`**: Área principal donde va todo el contenido desplazable
- **`class="ion-padding"`**: Agrega espacio interno (padding) alrededor del contenido

---

#### 3. **`<ion-card>`** - Tarjetas para agrupar contenido
```html
<ion-card *ngIf="!editando">
  <ion-card-header>
    <ion-card-title>Nuevo Comentario</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <!-- Contenido aquí -->
  </ion-card-content>
</ion-card>
```
- **`ion-card`**: Una tarjeta con sombra (como una caja elevada)
- **`*ngIf="!editando"`**: **DIRECTIVA ANGULAR** - Solo muestra esta tarjeta SI NO estás editando
  - `*ngIf` es una condición: "Si esto es verdadero, muéstralo"
  - `!editando` significa "si NO estoy editando"
- **`ion-card-header`**: Sección superior de la tarjeta
- **`ion-card-title`**: Título de la tarjeta
- **`ion-card-content`**: Contenido principal de la tarjeta

---

#### 4. **`<ion-item>`** - Fila/Campo de formulario
```html
<ion-item>
  <ion-label position="stacked">Comentario</ion-label>
  <ion-textarea [(ngModel)]="nuevoComentario.comentario" placeholder="Escribí tu comentario..."></ion-textarea>
</ion-item>
```
- **`ion-item`**: Una fila que contiene un campo del formulario
- **`ion-label`**: Etiqueta del campo
- **`position="stacked"`**: La etiqueta va ARRIBA del campo (no al lado)
- **`ion-textarea`**: Área de texto de varias líneas
- **`[(ngModel)]="nuevoComentario.comentario"`**: **BINDING BIDIRECCIONAL**
  - Los `[( )]` se llaman "banana in a box" 🍌📦
  - Lo que escribís en el campo se guarda automáticamente en `nuevoComentario.comentario`
  - Si cambias `nuevoComentario.comentario` en el código, el campo se actualiza solo
- **`placeholder`**: Texto de ayuda que aparece cuando el campo está vacío

---

#### 5. **`<ion-input>`** - Campo de texto simple
```html
<ion-input [(ngModel)]="nuevoComentario.descripcion" placeholder="Detalles opcionales"></ion-input>
```
- **`ion-input`**: Campo de texto de una sola línea
- Similar a `ion-textarea` pero para textos cortos

---

#### 6. **`<ion-range>`** - Control deslizante (slider)
```html
<ion-range min="1" max="5" step="1" snaps="true" [(ngModel)]="nuevoComentario.puntuacion">
  <ion-label slot="start">1</ion-label>
  <ion-label slot="end">5</ion-label>
</ion-range>
```
- **`ion-range`**: Barra deslizante para elegir un número
- **`min="1"`**: Valor mínimo (1 estrella)
- **`max="5"`**: Valor máximo (5 estrellas)
- **`step="1"`**: Se mueve de 1 en 1
- **`snaps="true"`**: El control "salta" a valores exactos (no valores intermedios)
- **`slot="start"`**: Etiqueta al inicio del slider
- **`slot="end"`**: Etiqueta al final del slider

---

#### 7. **`<ion-button>`** - Botón
```html
<ion-button expand="block" color="success" (click)="guardarComentario()">
  <ion-icon name="add-circle-outline" slot="start"></ion-icon>
  Guardar comentario
</ion-button>
```
- **`ion-button`**: Botón con estilo Ionic
- **`expand="block"`**: El botón ocupa todo el ancho disponible
- **`color="success"`**: Color verde (éxito)
- **`(click)="guardarComentario()"`**: **EVENTO** - Cuando hacés click, ejecuta la función `guardarComentario()`
- **`ion-icon`**: Icono dentro del botón
- **`name="add-circle-outline"`**: Nombre del icono (círculo con +)
- **`slot="start"`**: El icono va al inicio del botón (izquierda)

---

#### 8. **`<ion-searchbar>`** - Barra de búsqueda
```html
<ion-searchbar 
  [(ngModel)]="searchTerm" 
  (ionInput)="filtrarComentarios()"
  placeholder="Buscar comentarios..."
  showClearButton="always">
</ion-searchbar>
```
- **`ion-searchbar`**: Barra de búsqueda con ícono de lupa
- **`(ionInput)="filtrarComentarios()"`**: Cada vez que escribís algo, ejecuta `filtrarComentarios()`
- **`showClearButton="always"`**: Muestra siempre el botón de borrar (X)

---

#### 9. **`<ion-spinner>`** - Indicador de carga
```html
<ion-spinner name="crescent" color="primary"></ion-spinner>
```
- **`ion-spinner`**: Ruedita que gira mientras carga
- **`name="crescent"`**: Estilo de la animación (media luna)
- **`color="primary"`**: Color del spinner

---

#### 10. **`*ngFor`** - BUCLE (Repetir elementos)
```html
<ion-item *ngFor="let c of comentariosFiltrados">
  <ion-label>
    <h2>{{ c.comentario }}</h2>
    <p *ngIf="c.descripcion">{{ c.descripcion }}</p>
    <p>⭐ {{ c.puntuacion }} — {{ c.fecha_comentario | date:'short' }}</p>
  </ion-label>
  <ion-buttons slot="end">
    <ion-button color="primary" (click)="editar(c)">
      <ion-icon slot="icon-only" name="create-outline"></ion-icon>
    </ion-button>
    <ion-button color="danger" (click)="eliminarComentario(c.id_comentario!)">
      <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
    </ion-button>
  </ion-buttons>
</ion-item>
```

**Explicación del `*ngFor`:**
- **`*ngFor="let c of comentariosFiltrados"`**: 
  - "Para cada comentario `c` en la lista `comentariosFiltrados`, creá un `<ion-item>`"
  - Es como un bucle `for` que repite el HTML por cada elemento
  - `c` es la variable que representa cada comentario individual

**Explicación de las interpolaciones `{{ }}`:**
- **`{{ c.comentario }}`**: Muestra el texto del comentario
- **`{{ c.descripcion }}`**: Muestra la descripción
- **`{{ c.puntuacion }}`**: Muestra la puntuación (número)
- **`{{ c.fecha_comentario | date:'short' }}`**: 
  - Muestra la fecha
  - El `| date:'short'` es un **PIPE** (transformador)
  - Convierte la fecha a formato corto legible (ej: "30/10/25, 14:30")

**Botones de acción:**
- **`slot="end"`**: Los botones van al final del item (derecha)
- **`(click)="editar(c)"`**: Al hacer click, llama a `editar()` pasándole el comentario `c`
- **`slot="icon-only"`**: El botón solo tiene icono (sin texto)
- **`name="create-outline"`**: Icono de lápiz (editar)
- **`name="trash-outline"`**: Icono de basurero (eliminar)

---

## 🎨 ARCHIVO: comentario.page.scss (Los Estilos)

Este archivo define **CÓMO SE VE** (colores, tamaños, espacios).

```scss
ion-card {
  margin-bottom: 16px;  // Espacio de 16px debajo de cada tarjeta
}

ion-button {
  margin-top: 10px;  // Espacio de 10px arriba de cada botón
}

ion-item {
  --padding-start: 0;  // Sin padding al inicio del item
}

ion-range {
  padding: 10px 0;  // 10px arriba y abajo del slider
}
```

**Conceptos:**
- **`margin-bottom`**: Espacio FUERA del elemento (abajo)
- **`margin-top`**: Espacio FUERA del elemento (arriba)
- **`padding`**: Espacio DENTRO del elemento
- **`--padding-start`**: Variable CSS de Ionic para padding al inicio

---

## 💻 ARCHIVO: comentario.page.ts (La Lógica)

Este archivo define **QUÉ HACE** la página (la programación).

### Estructura del componente:

#### 1. **Imports** - Librerías que necesitamos
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
```
- **`Component`**: Para crear un componente Angular
- **`OnInit`**: Interfaz para ejecutar código al iniciar
- **`CommonModule`**: Funciones comunes de Angular (*ngIf, *ngFor, etc)
- **`FormsModule`**: Para formularios (ngModel)

---

#### 2. **Interface** - Definir la estructura de datos
```typescript
interface Comentario {
  id_comentario?: number;     // ? significa que es opcional
  comentario: string;          // obligatorio
  descripcion?: string;        // opcional
  fecha_comentario?: string;   // opcional
  puntuacion?: number;         // opcional
  usuario_id?: string;         // opcional
}
```
- Define qué propiedades tiene un comentario
- TypeScript usa esto para verificar que no metas datos incorrectos

---

#### 3. **@Component** - Configuración del componente
```typescript
@Component({
  selector: 'app-comentario',      // Nombre para usar en HTML
  standalone: true,                 // Es un componente independiente
  templateUrl: './comentario.page.html',  // Archivo HTML
  styleUrls: ['./comentario.page.scss'],  // Archivo CSS
  imports: [...]                    // Componentes que usa
})
```

---

#### 4. **Variables de la clase**
```typescript
export class ComentarioPage implements OnInit {
  comentarios: Comentario[] = [];              // Lista de TODOS los comentarios
  comentariosFiltrados: Comentario[] = [];     // Lista FILTRADA (búsqueda)
  nuevoComentario: Comentario = {              // Comentario que estás creando
    comentario: '', 
    descripcion: '', 
    puntuacion: 5 
  };
  editando: Comentario | null = null;          // Comentario que estás editando (o null si no editás nada)
  userId: string = '';                          // ID del usuario actual
  isLoading = false;                            // ¿Está cargando? true/false
  searchTerm: string = '';                      // Texto de búsqueda
```

---

#### 5. **Constructor** - Se ejecuta al crear el componente
```typescript
constructor(
  private db: DatabaseService,        // Servicio para hablar con la base de datos
  private alertCtrl: AlertController, // Para mostrar alertas
  private analytics: AnalyticsService // Para registrar eventos
) {
  addIcons({...});  // Registra los iconos que usarás
}
```

---

#### 6. **ngOnInit()** - Se ejecuta al iniciar la página
```typescript
async ngOnInit() {
  this.analytics.trackPageView('comentarios', '/tabs/comentario');  // Registra que visitaste la página
  const user = await this.db.getUser();  // Obtiene el usuario actual
  this.userId = user?.id || '';          // Guarda su ID
  this.cargarComentarios();              // Carga los comentarios
}
```
- **`async`**: Permite usar `await` para operaciones asincrónicas
- **`await`**: Espera a que termine la operación antes de continuar

---

#### 7. **cargarComentarios()** - Trae los comentarios de la base de datos
```typescript
async cargarComentarios() {
  this.isLoading = true;  // Activa el spinner de carga
  try {4
    // Obtiene todos los comentarios, ordenados por fecha (más recientes primero)
    this.comentarios = await this.db.getAll('comentario', 'fecha_comentario', false);
    // Copia los comentarios a la lista filtrada
    this.comentariosFiltrados = [...this.comentarios];
    this.filtrarComentarios();
  } catch (e) {
    console.error('Error al cargar comentarios', e);  // Si hay error, lo muestra
  } finally {
    this.isLoading = false;  // Desactiva el spinner (siempre se ejecuta)
  }
}
```

**Conceptos:**
- **`try...catch...finally`**: Manejo de errores
  - `try`: Intenta ejecutar esto
  - `catch`: Si hay error, ejecuta esto
  - `finally`: Siempre ejecuta esto (haya error o no)
- **`[...this.comentarios]`**: Crea una COPIA del array (no una referencia)

---

#### 8. **filtrarComentarios()** - Filtra por el texto de búsqueda
```typescript
filtrarComentarios() {
  if (!this.searchTerm || this.searchTerm.trim() === '') {
    // Si no hay texto de búsqueda, muestra todos
    this.comentariosFiltrados = [...this.comentarios];
  } else {
    const term = this.searchTerm.toLowerCase();  // Convierte a minúsculas
    // Filtra comentarios que contengan el texto buscado
    this.comentariosFiltrados = this.comentarios.filter(c =>
      c.comentario.toLowerCase().includes(term) ||
      (c.descripcion && c.descripcion.toLowerCase().includes(term))
    );
  }
}
```

**Método `filter()`:**
- Crea un nuevo array con solo los elementos que cumplan la condición
- `c => ...` es una función flecha: "para cada comentario c, evalúa esta condición"
- `includes(term)`: ¿El texto contiene `term`?
- `||` significa "O" (si cumple cualquiera de las dos condiciones)

---

#### 9. **guardarComentario()** - Guarda un nuevo comentario
```typescript
async guardarComentario() {
  if (!this.nuevoComentario.comentario?.trim()) return;  // Si está vacío, no hace nada
  
  try {
    // Inserta en la base de datos
    await this.db.insert('comentario', { 
      ...this.nuevoComentario,  // Copia todas las propiedades
      usuario_id: this.userId    // Agrega el ID del usuario
    });
    
    this.analytics.trackComentarioCreated(this.nuevoComentario.puntuacion || 5);  // Registra el evento
    
    // Limpia el formulario
    this.nuevoComentario = { comentario: '', descripcion: '', puntuacion: 5 };
    
    this.cargarComentarios();  // Recarga la lista
  } catch (e) {
    console.error('Error al guardar', e);
    this.analytics.trackError('comentario_creation_error', String(e));
  }
}
```

**Conceptos:**
- **`?.trim()`**: Operador de encadenamiento opcional
  - Si `comentario` es null/undefined, no da error, devuelve undefined
  - `trim()` elimina espacios al inicio y final
- **`...this.nuevoComentario`**: Spread operator - expande todas las propiedades

---

#### 10. **editar()** - Prepara un comentario para editar
```typescript
editar(c: Comentario) {
  this.editando = { ...c };  // Crea una COPIA del comentario
}
```
- Hacemos copia para no modificar el original hasta confirmar

---

#### 11. **actualizarComentario()** - Guarda los cambios de edición
```typescript
async actualizarComentario() {
  if (!this.editando?.id_comentario) return;  // Si no hay ID, sale
  
  try {
    // Actualiza en la base de datos
    await this.db.update(
      'comentario',                    // Tabla
      this.editando.id_comentario,     // ID a actualizar
      {
        comentario: this.editando.comentario,
        descripcion: this.editando.descripcion,
        puntuacion: this.editando.puntuacion,
      },
      'id_comentario'                  // Nombre de la columna ID
    );
    
    this.editando = null;              // Sale del modo edición
    this.cargarComentarios();          // Recarga la lista
  } catch (e) {
    console.error('Error al actualizar', e);
  }
}
```

---

#### 12. **eliminarComentario()** - Elimina un comentario
```typescript
async eliminarComentario(id: number) {
  // Crea un diálogo de confirmación
  const alert = await this.alertCtrl.create({
    header: 'Confirmar',
    message: '¿Deseás eliminar este comentario?',
    buttons: [
      { text: 'Cancelar', role: 'cancel' },  // Botón cancelar
      {
        text: 'Eliminar',
        handler: async () => {  // Si presiona "Eliminar"
          try {
            await this.db.delete('comentario', id, 'id_comentario');  // Elimina de la BD
            this.cargarComentarios();  // Recarga la lista
          } catch (e) {
            console.error('Error al eliminar', e);
          }
        },
      },
    ],
  });
  
  await alert.present();  // Muestra el diálogo
}
```

---

## 🧪 ARCHIVO: comentario.page.spec.ts (Tests)

Este archivo define **PRUEBAS AUTOMÁTICAS** para verificar que todo funcione.

```typescript
describe('ComentarioPage', () => {  // Describe el conjunto de tests
  let component: ComentarioPage;     // Variable para el componente
  let fixture: ComponentFixture<ComentarioPage>;  // Variable para el entorno de test

  beforeEach(() => {  // Se ejecuta ANTES de cada test
    fixture = TestBed.createComponent(ComentarioPage);  // Crea el componente
    component = fixture.componentInstance;              // Obtiene la instancia
    fixture.detectChanges();                            // Detecta cambios
  });

  it('should create', () => {  // Test: "debería crearse"
    expect(component).toBeTruthy();  // Verifica que el componente exista
  });
});
```

**Conceptos:**
- **`describe()`**: Agrupa tests relacionados
- **`beforeEach()`**: Código que se ejecuta antes de cada test
- **`it()`**: Define un test individual
- **`expect().toBeTruthy()`**: Verifica que algo sea verdadero/exista

---

## 🔄 Flujo completo de la aplicación:

### 1. **Usuario entra a la página:**
```
1. ngOnInit() se ejecuta
2. Obtiene el usuario actual
3. Llama a cargarComentarios()
4. Muestra el spinner (isLoading = true)
5. Trae los comentarios de la BD
6. Los muestra en la lista
7. Oculta el spinner (isLoading = false)
```

### 2. **Usuario crea un comentario:**
```
1. Escribe en los campos (ngModel conecta automáticamente con nuevoComentario)
2. Mueve el slider de puntuación
3. Presiona "Guardar comentario"
4. Se ejecuta guardarComentario()
5. Valida que no esté vacío
6. Lo guarda en la base de datos
7. Limpia el formulario
8. Recarga la lista
```

### 3. **Usuario busca comentarios:**
```
1. Escribe en el searchbar (ngModel conecta con searchTerm)
2. Cada letra dispara filtrarComentarios()
3. Filtra comentariosFiltrados
4. *ngFor actualiza automáticamente la lista en pantalla
```

### 4. **Usuario edita un comentario:**
```
1. Presiona el botón de editar en un comentario
2. Se ejecuta editar(c)
3. Se guarda una copia en "editando"
4. *ngIf oculta el formulario de "Nuevo" y muestra el de "Editar"
5. Usuario modifica los campos
6. Presiona "Actualizar"
7. Se ejecuta actualizarComentario()
8. Se guarda en la BD
9. editando = null (oculta formulario de edición)
10. Recarga la lista
```

### 5. **Usuario elimina un comentario:**
```
1. Presiona el botón de eliminar
2. Se ejecuta eliminarComentario(id)
3. Muestra diálogo de confirmación
4. Si confirma, elimina de la BD
5. Recarga la lista
```

---

## 📚 Glosario de términos:

- **Component**: Pieza reutilizable de la interfaz (tiene HTML, CSS y lógica)
- **Binding**: Conexión entre el HTML y el TypeScript
- **Two-way binding** (`[(ngModel)]`): Conexión bidireccional (HTML ↔️ TS)
- **Event binding** (`(click)`): Ejecuta código cuando ocurre un evento
- **Interpolation** (`{{ }}`): Muestra valores en el HTML
- **Directive** (`*ngIf`, `*ngFor`): Instrucciones especiales que modifican el HTML
- **Service**: Clase que proporciona funcionalidades (como conectar con BD)
- **Async/Await**: Manejo de operaciones asincrónicas (que tardan tiempo)
- **Interface**: Define la estructura de un objeto (qué propiedades tiene)
- **Array**: Lista de elementos
- **Filter**: Filtra un array según una condición
- **Spread operator** (`...`): Expande o copia elementos

---

## ✅ Resumen rápido:

1. **HTML** = Estructura (qué se muestra)
2. **SCSS** = Estilos (cómo se ve)
3. **TS** = Lógica (qué hace)
4. **Spec** = Tests (verifica que funcione)

**Ionic** te da componentes pre-hechos (`ion-*`) que se ven bien en móvil.
**Angular** conecta todo con directivas (`*ngIf`, `*ngFor`, `ngModel`).
**TypeScript** agrega tipos para evitar errores.

---

## 🎓 Consejos para aprender:

1. **Modificá los valores** y mirá qué pasa
2. **Agregá console.log()** en las funciones para ver qué hacen
3. **Comentá líneas** (con //) para ver qué se rompe
4. **Leé la documentación** de Ionic y Angular cuando tengas dudas

---

**¡Espero que esto te ayude a entender mejor cómo funciona! 🚀**
