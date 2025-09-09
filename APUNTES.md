## Guides

Limpieza de imports sin usar

```bash
ng generate @angular/core:cleanup-unused-imports
```

Instalación de EsLint

```bash
ng add @angular-eslint/schematics
```

Ejecutar linter

```bash
ng lint
```

Instalacion prettier para formateador de codigo

```bash
npm i prettier -D
```
Una vez instalado, es recomendable crear un comando npm para ejecutarlo fácilmente:

```code
"scripts": {
  "format": "prettier --write ."
}
```
Nota: Puedes limitar el alcance del formateo a directorios específicos, como src, si no deseas aplicarlo a archivos de configuración:

```code 
"format": "prettier --write src"
```

Para personalizar el comportamiento de Prettier según las preferencias de tu equipo, puedes crear un archivo .prettierrc.json en la raíz del proyecto:
```code 
{

  "tabWidth": 2, // Define el ancho de la tabulación en 2 espacios.

  "useTabs": false, // Usa espacios en lugar de tabulaciones.

  "singleQuote": true, // Usa comillas simples en lugar de comillas dobles.

  "semi": true, // Agrega punto y coma al final de cada línea.

  "bracketSpacing": true, // Agrega espacios dentro de los corchetes { clave: valor }.

  "arrowParens": "avoid", // Omite los paréntesis en funciones flecha con un solo parámetro (ej: x => x + 1).

  "trailingComma": "es5", // Agrega comas finales en objetos y arrays según la sintaxis de ES5.

  "bracketSameLine": true, // Coloca los corchetes de cierre en la misma línea en JSX.

  "printWidth": 80, // Establece el límite de caracteres por línea a 80 para mejorar la legibilidad.

  "overrides": [ // Configuración específica para ciertos tipos de archivos.
    {
      "files": "*.html", // Aplica esta configuración a todos los archivos HTML.
      "options": {
        "parser": "html" // Usa el parser de HTML para formatear estos archivos.
      }
    },
    {
      "files": "*.component.html", // Aplica esta configuración a archivos Angular HTML.
      "options": {
        "parser": "angular" // Usa el parser específico de Angular para estos archivos.
      }
    }
  ]
}
```


Para que ESLint y Prettier trabajen en armonía, es necesario instalar algunos paquetes adicionales:

```code 
npm install eslint-config-prettier eslint-plugin-prettier -D
```
Para completar la integración, modifica tu archivo .eslintrc.js añadiendo: (prettierRules)

```code 
const prettierRules = require('eslint-plugin-prettier/recommended');


module.exports = tseslint.config(
  {
   ...
    extends: [
      ...
      prettierRules
    ],
    ...
  },
  {
    ...
    extends: [
      prettierRules
    ],
    rules: {},
  },
);

```
