# 📱 App Gestión de Turnos

Aplicación móvil desarrollada con **Ionic Angular** y **Supabase** para la gestión integral de turnos médicos/profesionales.

---

## 🚀 Características

- ✅ **Autenticación** con Supabase Auth
- 📅 **Gestión de turnos** (crear, listar, editar, eliminar)
- 👤 **Perfil de usuario** con avatares personalizables
- 🏥 **Servicios** (CRUD completo)
- 💬 **Sistema de comentarios** con puntuaciones y búsqueda
- 📊 **Dashboard** con estadísticas
- 🌙 **Dark Mode** con persistencia
- 📱 **PWA Ready** (funciona offline)
- 🔔 **Push Notifications** (Capacitor)
- 📈 **Analytics** integrado
- 🔍 **Búsqueda en tiempo real**
- 📱 **Responsive** (Web, iOS, Android)

---

## 🛠️ Stack Tecnológico

- **Framework**: Ionic 8 + Angular 20 (Standalone Components)
- **Base de datos**: Supabase (PostgreSQL con RLS)
- **Autenticación**: Supabase Auth
- **UI**: Ionic Components
- **Lenguaje**: TypeScript 5.8
- **Mobile**: Capacitor 7
- **PWA**: Angular Service Worker
- **Push**: Capacitor Push Notifications

---

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Ionic CLI: `npm install -g @ionic/cli`
- Cuenta en [Supabase](https://supabase.com)

---

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Grupo4austral/app-gestion-turnos.git
cd app-gestion-turnos
```

### 2. Instalar dependencias

```bash
npm install --legacy-peer-deps
```

### 3. Configurar variables de entorno

1. Copiar el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Editar `src/environments/environment.ts` y `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'TU_SUPABASE_URL',
    anonKey: 'TU_SUPABASE_ANON_KEY'
  }
};
```

⚠️ **IMPORTANTE**: Nunca commitear las credenciales reales. El archivo `.env.example` muestra el formato.

### 4. Crear las tablas en Supabase

Ejecutar los scripts SQL en el **SQL Editor** de Supabase:

```bash
# Script principal (si existe)
supabase-schema.sql

# Script de comentarios
supabase-comentarios.sql
```

---

## 🚀 Ejecución

### Desarrollo (navegador)

```bash
ionic serve
```

La app se abrirá en `http://localhost:8100`

### Build para producción

```bash
npm run build
```

### iOS

```bash
ionic capacitor add ios
ionic capacitor copy ios
ionic capacitor open ios
```

### Android

```bash
ionic capacitor add android
ionic capacitor copy android
ionic capacitor open android
```

---

## 📁 Estructura del Proyecto

```
app-gestion-turnos/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── login/              # Página de login
│   │   ├── services/
│   │   │   ├── auth.ts             # Servicio de autenticación
│   │   │   └── database.ts         # Servicio de base de datos
│   │   ├── tabs/
│   │   │   ├── home/               # Dashboard principal
│   │   │   ├── health/             # Gestión de turnos
│   │   │   ├── capture/            # CRUD de servicios
│   │   │   ├── stats/              # Estadísticas
│   │   │   ├── profile/            # Perfil de usuario
│   │   │   ├── comentario/         # Sistema de comentarios
│   │   │   └── tabs.page.ts        # Navegación de tabs
│   │   ├── app.component.ts        # Componente raíz
│   │   ├── app.routes.ts           # Rutas de la aplicación
│   │   └── supabase.ts             # Cliente de Supabase
│   ├── assets/                     # Imágenes, íconos
│   ├── environments/               # Configuración por entorno
│   └── theme/                      # Estilos globales
├── angular.json                    # Configuración de Angular
├── capacitor.config.ts             # Configuración de Capacitor
├── ionic.config.json               # Configuración de Ionic
└── package.json                    # Dependencias

```

---

## 🗄️ Esquema de Base de Datos

### Tablas principales

- **`usuario`**: Información de usuarios
- **`turno`**: Turnos agendados
- **`servicio`**: Servicios disponibles
- **`prestador`**: Profesionales/Prestadores
- **`sucursal`**: Sucursales
- **`comentario`**: Comentarios y valoraciones

### Relaciones

```
usuario ──┬─→ turno
          └─→ comentario

turno ──┬─→ servicio
        ├─→ prestador
        └─→ sucursal
```

---

## 🔐 Seguridad

### Row Level Security (RLS)

Todas las tablas tienen políticas RLS habilitadas:

- Los usuarios solo pueden ver/editar sus propios datos
- Los comentarios son públicos para lectura
- Los turnos son privados por usuario

### Autenticación

- Login con email/password
- Sesiones gestionadas por Supabase Auth
- Tokens JWT automáticos

---

## 📱 Funcionalidades por Pestaña

### 🏠 Home
- Dashboard con accesos rápidos
- Navegación a secciones principales

### 🏥 Health (Turnos)
- Crear nuevo turno
- Seleccionar servicio, profesional y sucursal
- Ver historial de turnos
- Estado de turnos (pendiente, confirmado, cancelado)

### 📷 Capture (Servicios)
- CRUD completo de servicios
- Duración y precio por servicio
- Edición inline

### 📊 Stats
- Estadísticas y métricas

### 👤 Profile
- Editar datos personales
- Cambiar avatar
- Cerrar sesión

### 💬 Comentarios
- Crear comentarios con puntuación (1-5 estrellas)
- Editar comentarios propios
- Eliminar comentarios
- Ver comentarios recientes

---

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests E2E (si están configurados)
npm run e2e
```

---

## 📝 Scripts Disponibles

```bash
npm start           # Inicia el servidor de desarrollo
npm run build       # Build para producción
npm test            # Ejecuta los tests
npm run lint        # Linter de código
```

---

## 🐛 Problemas Conocidos

Ver el archivo `MEJORAS-SUGERIDAS.md` para lista completa de mejoras pendientes.

### Críticos
- [ ] Credenciales de Supabase expuestas en el código
- [ ] UUID hardcodeado en health.page.ts

### En progreso
- [ ] Migración completa a standalone components
- [ ] Tests actualizados para Angular 20

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Convenciones de commits

```
feat: Nueva funcionalidad
fix: Corrección de bug
docs: Documentación
style: Formato, punto y coma, etc
refactor: Refactorización de código
test: Tests
chore: Tareas de mantenimiento
```

---

## 👥 Equipo

**Grupo 4 Austral**

---

## 📄 Licencia

Este proyecto es privado y pertenece al Grupo 4 Austral.

---

## 📞 Soporte

Para reportar bugs o solicitar features, abrir un issue en GitHub.

---

## 🔗 Enlaces Útiles

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

---

## 📈 Roadmap

- [ ] Notificaciones push
- [ ] Modo offline (PWA)
- [ ] Filtros y búsqueda avanzada
- [ ] Exportación de datos
- [ ] Integración con calendarios (Google Calendar, iCal)
- [ ] Chat en tiempo real
- [ ] Videollamadas integradas

---

**Desarrollado con ❤️ por Grupo 4 Austral**
