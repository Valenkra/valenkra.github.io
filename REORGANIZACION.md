# ValenOS — reorganización sin rediseño

Se separó el archivo App.tsx original en componentes y módulos: `src/apps/` contiene cada aplicación, `src/desktop/` contiene el escritorio, las ventanas, el estado y los íconos, y `src/data/projects.ts` concentra los seis proyectos.

El CSS original se dividió en ocho archivos importados en el mismo orden desde `src/main.tsx`. **No se eliminaron ni reescribieron reglas CSS**: la concatenación de los ocho archivos reproduce exactamente el CSS anterior. Esto preserva la cascada y los ajustes responsive, aunque deja redundancias históricas por resolver en una etapa posterior con comparación visual.

Los componentes conservan el JSX, las funciones y los textos del original; se ajustaron únicamente imports/exports y una referencia de tipo React.

Instalación: reemplazá el contenido de tu proyecto por esta versión (o copiá `src/`), ejecutá `npm install` y `npm run build`. No incluye `.git`, `node_modules` ni `dist`.
