# ValenOS 🫧

Portfolio interactivo inspirado en **Windows XP + Frutiger Aero**. Primera versión funcional, lista para personalizar.

## Requisitos
- Node.js 20.19+ o 22.12+
- npm

## Ejecutar localmente
```bash
npm install
npm run dev
```
Abrí la URL local que indique Vite (normalmente http://localhost:5173).

## Compilar
```bash
npm run build
npm run preview
```

## Personalizar
- `src/App.tsx`: presentación, proyectos, enlaces y apps.
- `src/styles.css`: colores, ventanas y fondo Frutiger Aero (creado en CSS, sin imágenes externas).
- `public/`: agregá imágenes y audio propios o con permiso.

**Importante:** los proyectos 02–04 son ejemplos, los enlaces de contacto son genéricos y Valenamp es una interfaz de demostración **sin audio real**. Reemplazalos antes de publicar.

## GitHub Pages
El repositorio incluye un workflow en `.github/workflows/deploy.yml`.
1. Subí el proyecto a un repositorio de GitHub.
2. Entrá a **Settings → Pages → Build and deployment** y elegí **GitHub Actions**.
3. Hacé push a la rama `main` y esperá a que termine el workflow.
4. El sitio quedará disponible en `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

Vite usa `base: './'` para que los assets funcionen tanto en la raíz como en una subruta de GitHub Pages. No se utiliza router con URLs profundas.


## Íconos Windows XP
Los íconos seleccionados se encuentran en `public/icons/xp/`, extraídos del pack proporcionado por la usuaria (Windows XP High Resolution Icon Pack, Marchmountain). Verificá los derechos de redistribución antes de publicar el repositorio públicamente.
