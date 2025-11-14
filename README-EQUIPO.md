# 📱 App Gestión de Turnos - Guía del Equipo

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn
- Git

### 🔧 Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Grupo4austral/app-gestion-turnos.git
cd app-gestion-turnos

# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar servidor de desarrollo
ionic serve
```

La aplicación se abrirá en `http://localhost:8101`

---

## 📂 Estructura del Proyecto

```
app-gestion-turnos/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── login/           # Página de inicio de sesión
│   │   ├── tabs/
│   │   │   ├── health/          # Tab de salud/registros
│   │   │   ├── capture/         # Tab de captura
│   │   │   ├── stats/           # Tab de estadísticas
│   │   │   ├── profile/         # Tab de perfil de usuario
│   │   │   └── comentario/      # Tab de comentarios
│   │   ├── services/
│   │   │   ├── auth.ts          # Servicio de autenticación
│   │   │   ├── database.ts      # Servicio de base de datos
│   │   │   ├── analytics.service.ts
│   │   │   ├── push-notifications.service.ts
│   │   │   └── theme.service.ts
│   │   ├── app.component.ts     # Componente raíz
│   │   └── app.routes.ts        # Configuración de rutas
│   ├── assets/                  # Imágenes, iconos, etc.
│   ├── theme/                   # Estilos globales
│   └── environments/            # Configuración de entornos
├── capacitor.config.ts          # Configuración de Capacitor
└── package.json                 # Dependencias del proyecto
```

---

## 🎯 Funcionalidades Principales

### ✅ Implementadas
- 🔐 **Autenticación**: Login con Supabase
- 👤 **Perfil de Usuario**: Gestión de datos personales
- 💚 **Health**: Registro de salud
- 📸 **Capture**: Captura de información
- 📊 **Stats**: Visualización de estadísticas
- 💬 **Comentarios**: Sistema CRUD completo
- 🔔 **Push Notifications**: Notificaciones configuradas
- 🎨 **Tema**: Sistema de temas claro/oscuro
- 📱 **PWA**: Progressive Web App configurada

---

## 🔑 Variables de Entorno

Crear archivo `.env` en la raíz:
```env
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_key
```

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm start
# o
ionic serve

# Limpiar caché si hay problemas
rm -rf .angular www dist node_modules/.cache
```

### Build
```bash
# Build para producción
ionic build --prod

# Build para Android
ionic cap build android

# Build para iOS
ionic cap build ios
```

### Testing
```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage
```

### Git Workflow
```bash
# Crear nueva rama para feature
git checkout -b feature/nombre-feature

# Commitear cambios
git add .
git commit -m "feat: descripción del cambio"

# Pushear cambios
git push origin feature/nombre-feature

# Actualizar desde master
git pull origin master
```

---

## 📱 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Ionic** | 8.x | Framework UI |
| **Angular** | 20.x | Framework frontend |
| **Capacitor** | 7.x | Puente nativo |
| **Supabase** | - | Backend/Base de datos |
| **TypeScript** | 5.8.x | Lenguaje |
| **Node.js** | 18+ | Runtime |

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Error de compilación
```bash
rm -rf .angular www dist
ionic serve
```

### Puerto 8101 ocupado
```bash
# Matar proceso en puerto 8101
lsof -ti:8101 | xargs kill -9

# O usar otro puerto
ionic serve --port 8102
```

### Errores de cache
```bash
rm -rf .angular node_modules/.cache
npm run clean  # si existe el script
```

---

## 📝 Convenciones de Código

### Commits
Usar [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, punto y coma faltante, etc.
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Mantenimiento

### Nombres de Archivos
- Componentes: `nombre.component.ts`
- Páginas: `nombre.page.ts`
- Servicios: `nombre.service.ts`
- Modelos: `nombre.model.ts`

### Código TypeScript
- Usar interfaces para tipos
- Documentar funciones públicas con JSDoc
- Nombres de variables en camelCase
- Nombres de clases en PascalCase
- Constantes en UPPER_SNAKE_CASE

---

## 👥 Equipo

Para agregar nuevos miembros al equipo:
1. Dar acceso al repositorio en GitHub
2. Compartir las credenciales de Supabase
3. Asegurarse de que tienen las herramientas instaladas
4. Revisar esta documentación

---

## 🔄 Estado del Proyecto

### ✅ Últimas Correcciones (30/10/2025)
- ✅ Corregido `app.routes.ts` (estaba corrupto)
- ✅ Corregido `app.component.ts` (exportaba clase incorrecta)
- ✅ Actualizado `tsconfig.app.json` (target ES2022)
- ✅ Removido `IonLabel` no usado en tabs
- ✅ Eliminada carpeta duplicada `app-gestion-turnos/`
- ✅ Compilación exitosa sin errores

### 📊 Métricas
- **Errores de compilación**: 0
- **Warnings**: 2 (archivos no usados en tsconfig)
- **Cobertura de tests**: Por definir
- **Bundle size**: ~7 MB (vendor + app)

---

## 📚 Recursos Adicionales

### Documentación
- [Ionic Framework](https://ionicframework.com/docs)
- [Angular](https://angular.dev)
- [Capacitor](https://capacitorjs.com/docs)
- [Supabase](https://supabase.io/docs)

### Archivos de Documentación en el Proyecto
- `COMENTARIOS-EXPLICACION.md` - Explicación del sistema de comentarios
- `COMENTARIOS-README.md` - README de comentarios
- `MEJORAS-IMPLEMENTADAS.md` - Lista de mejoras realizadas
- `MEJORAS-SUGERIDAS.md` - Sugerencias de mejoras futuras
- `PWA-PUSH-SETUP.md` - Configuración de PWA y notificaciones

---

## 📞 Contacto y Soporte

Si tenés problemas:
1. Revisar esta documentación
2. Buscar en los issues de GitHub
3. Crear un nuevo issue con el label apropiado
4. Contactar al team lead

---

## 🎉 ¡Empezá a Desarrollar!

1. Asegurate de tener todo instalado
2. Clona el repo
3. Instala dependencias
4. Ejecuta `ionic serve`
5. ¡Empezá a codear!

**Happy Coding! 🚀**
