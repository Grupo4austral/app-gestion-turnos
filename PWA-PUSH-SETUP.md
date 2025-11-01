# 📱 Configuración de PWA y Push Notifications

Este documento contiene las instrucciones para completar la configuración de Progressive Web App (PWA) y notificaciones push en la aplicación.

---

## 🌐 PWA (Progressive Web App)

### ✅ Lo que ya está configurado

- ✅ Service Worker de Angular instalado
- ✅ Archivo `ngsw-config.json` creado
- ✅ Manifest (`src/manifest.webmanifest`) configurado
- ✅ Iconos PWA generados en `src/assets/icons/`
- ✅ `angular.json` actualizado con configuración PWA

### 📝 Cómo funciona

La aplicación ya es una PWA funcional. Cuando se sirve en producción:

1. **Cacheo offline**: Los assets se cachean automáticamente
2. **Instalable**: Puede instalarse en el dispositivo como app nativa
3. **Updates**: Actualiza automáticamente cuando hay nueva versión

### 🚀 Para probar en desarrollo

```bash
# Build de producción
npm run build

# Servir con http-server (instalar si no lo tienes)
npx http-server www -p 8080
```

Luego visita `http://localhost:8080` y verás el botón de "Instalar App" en navegadores compatibles.

### 🎨 Personalizar manifest

Editar `src/manifest.webmanifest`:

```json
{
  "name": "Gestión de Turnos",
  "short_name": "Turnos",
  "theme_color": "#3880ff",  // Color del tema
  "background_color": "#ffffff",  // Color de fondo
  "display": "standalone",
  "scope": "./",
  "start_url": "./"
}
```

### 📦 Configuración de caché

El archivo `ngsw-config.json` controla qué se cachea:

- **Assets**: Imágenes, fuentes, iconos (cacheo agresivo)
- **Data**: API calls (cacheo con estrategia network-first)

---

## 🔔 Push Notifications

### ✅ Lo que ya está configurado

- ✅ Plugin `@capacitor/push-notifications` instalado
- ✅ Servicio `PushNotificationsService` creado
- ✅ Inicialización en `app.component.ts`
- ✅ Listeners configurados para recibir notificaciones

### 🔧 Configuración requerida

#### 1. Para Android (Firebase Cloud Messaging)

**Paso 1: Crear proyecto en Firebase**

1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Crear nuevo proyecto (o usar uno existente)
3. Agregar app Android
4. Descargar `google-services.json`
5. Colocar en `android/app/google-services.json`

**Paso 2: Configurar en código**

Editar `android/app/build.gradle`:

```gradle
dependencies {
    implementation 'com.google.firebase:firebase-messaging:23.1.0'
    // ...otras dependencias
}

apply plugin: 'com.google.gms.google-services'
```

**Paso 3: Obtener Server Key de Firebase**

1. En Firebase Console → Project Settings → Cloud Messaging
2. Copiar "Server Key" (se usa en el backend para enviar notificaciones)

#### 2. Para iOS (Apple Push Notification Service - APNs)

**Requisitos**:
- Cuenta de Apple Developer ($99/año)
- Certificado de APNs
- Provisioning Profile

**Pasos**:

1. **Generar certificado APNs** en Apple Developer Portal
2. **Configurar en Xcode**:
   - Abrir `ios/App/App.xcworkspace`
   - Habilitar "Push Notifications" en Capabilities
   - Configurar Signing & Capabilities

3. **Subir certificado a Firebase** (si usas FCM como intermediario)

---

## 📡 Backend para enviar notificaciones

### Ejemplo con Node.js + Firebase Admin SDK

```javascript
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Enviar notificación
const message = {
  notification: {
    title: 'Nuevo turno confirmado',
    body: 'Tu turno para el 25/10 ha sido confirmado'
  },
  data: {
    page: '/tabs/health',
    turnoId: '123'
  },
  token: 'DEVICE_TOKEN_AQUI'
};

admin.messaging().send(message)
  .then(response => console.log('Notificación enviada:', response))
  .catch(error => console.error('Error:', error));
```

### Guardar tokens en base de datos

Cuando el usuario registra su dispositivo, el token debe guardarse:

```typescript
// En push-notifications.service.ts
private sendTokenToServer(token: string): void {
  // Implementar llamada HTTP a tu backend
  this.http.post('https://tu-api.com/save-token', {
    token,
    userId: this.authService.getUserId(),
    platform: this.platform.is('ios') ? 'ios' : 'android'
  }).subscribe();
}
```

---

## 🧪 Testing

### Probar PWA

```bash
# Build de producción
npm run build

# Test con Lighthouse (Chrome DevTools)
# → Audits → Progressive Web App
```

### Probar Push Notifications

**En dispositivo Android**:

```bash
# Build y sincronizar
ionic build
npx cap sync android
npx cap open android

# En Android Studio, hacer "Run"
```

**Enviar notificación de prueba** desde Firebase Console:
1. Cloud Messaging → Send test message
2. Pegar el token del dispositivo
3. Enviar

---

## 📋 Checklist de implementación

### PWA
- [x] Service Worker instalado
- [x] Manifest configurado
- [x] Iconos generados
- [ ] Testeado en producción
- [ ] Testeado instalación en dispositivo

### Push Notifications
- [x] Plugin instalado
- [x] Servicio creado
- [x] Listeners configurados
- [ ] Firebase configurado (Android)
- [ ] APNs configurado (iOS)
- [ ] Backend para enviar notificaciones
- [ ] Guardar tokens en BD
- [ ] Probar envío de notificaciones

---

## 📚 Recursos adicionales

- [Ionic PWA Guide](https://ionicframework.com/docs/angular/pwa)
- [Capacitor Push Notifications](https://capacitorjs.com/docs/apis/push-notifications)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- [Angular Service Worker](https://angular.io/guide/service-worker-intro)

---

## 🆘 Troubleshooting

### PWA no se instala

- Verifica que estés en HTTPS (o localhost)
- Revisa la consola del navegador
- Verifica que el manifest esté correctamente linkeado en `index.html`

### Push notifications no funcionan

- Android: Verifica que `google-services.json` esté en la ubicación correcta
- iOS: Verifica que los certificados de APNs estén configurados
- Revisa los permisos en el dispositivo
- Chequea los logs con `npx cap run android -l` o Xcode console

### Service Worker no actualiza

```bash
# Limpiar cache y rebuild
rm -rf www
npm run build
```

En Chrome DevTools:
- Application → Service Workers → Unregister
- Recargar la página
