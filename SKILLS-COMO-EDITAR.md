# Editar niveles de Skills

Abrí `src/data/skillLevels.json` y cambiá los números de cada tecnología entre **0 y 100**.

Ejemplo:

```json
"frontend": {
  "HTML": 80,
  "CSS": 50
}
```

Cada popup tiene **10 bloques**: 80 muestra 8 verdes y 50 muestra 5.

También podés añadir skills nuevas dentro de una categoría: `"Sass": 40`. Aparecerán al abrir el `.exe` correspondiente. No necesitás modificar React.

Los valores incluidos son **ejemplos editables**, no una evaluación real de tus conocimientos.

Los bloques representan un nivel fijo y **no avanzan solos**. La carpeta Skills ahora abre en una ventana de 650 × 440 píxeles en escritorio, con un ajuste para móviles.
