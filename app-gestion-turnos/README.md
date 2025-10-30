# Proyecto de Gestión de Turnos

Este proyecto es una aplicación de gestión de turnos que permite a los usuarios crear, editar y eliminar comentarios sobre servicios médicos. La aplicación está construida utilizando Angular y Ionic, proporcionando una interfaz de usuario moderna y responsiva.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
app-gestion-turnos
├── README.md
├── angular.json
├── package.json
├── tsconfig.json
├── src
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── core
│   │   │   ├── components
│   │   │   │   └── side-nav
│   │   │   │       ├── side-nav.component.html
│   │   │   │       ├── side-nav.component.scss
│   │   │   │       └── side-nav.component.ts
│   │   │   ├── models
│   │   │   │   └── navigation-item.model.ts
│   │   │   └── services
│   │   │       └── layout-state.service.ts
│   │   ├── layout
│   │   │   └── app-shell
│   │   │       ├── app-shell.component.html
│   │   │       ├── app-shell.component.scss
│   │   │       └── app-shell.component.ts
│   │   └── tabs
│   │       └── comentario
│   │           ├── comentario.page.html
│   │           ├── comentario.page.scss
│   │           └── comentario.page.ts
│   ├── assets
│   │   └── icons
│   ├── global.scss
│   ├── index.html
│   ├── main.ts
│   └── theme
│       ├── palettes.scss
│       └── variables.scss
```

## Características

- **Gestión de Comentarios**: Los usuarios pueden crear, editar y eliminar comentarios sobre servicios médicos.
- **Interfaz de Usuario**: Diseño moderno y responsivo utilizando Angular y Ionic.
- **Navegación**: Menú lateral que permite ver solo íconos o íconos y etiquetas.
- **Estilo**: Fondo claro con un diseño plano utilizando tonos blancos y grises.

## Instalación

Para instalar las dependencias del proyecto, ejecute:

```
npm install
```

## Ejecución

Para iniciar la aplicación en modo de desarrollo, ejecute:

```
ng serve
```

Luego, abra su navegador y dirígete a `http://localhost:4200`.

## Contribuciones

Las contribuciones son bienvenidas. Si desea contribuir, por favor abra un issue o un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo LICENSE para más detalles.