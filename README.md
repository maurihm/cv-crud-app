# CvMuskStyle

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Deploy del CV a subruta de GitHub Pages (/cv)

Este proyecto puede publicar el CV en la subruta `/cv` del repositorio `maurihm.github.io` sin mezclar ambos proyectos.

### Flujo recomendado

1. Mantener este repo como dashboard/editor (`cv-musk-style-crud`).
2. Mantener el repo `maurihm.github.io` solo como sitio público.
3. Al hacer push a `main` en este repo, un workflow compila Angular y sincroniza `dist/cv-musk-style/browser` hacia `maurihm.github.io/cv`.

### Requisito de autenticación

Crear en este repositorio el secreto:

- `GH_PAGES_TOKEN`: Personal Access Token con permisos de escritura sobre `maurihm/maurihm.github.io`.

### Archivo del workflow

- `.github/workflows/deploy-cv-subruta.yml`

### Build local para subruta

```bash
npm run build:gh-cv
```

Este comando usa `--base-href /cv/` para que los assets funcionen correctamente en `https://maurihm.github.io/cv/`.
