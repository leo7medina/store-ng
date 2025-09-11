## Configuracion de  ESLint y Prettier

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


## Configuracion de ambientes

Para habilitar los ambientes en Angular, debemos ejecutar el siguiente comando:

```bash
ng generate environment
```

## Instalacion Tailwind


```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init
```

tailwindcss.config.js
```code 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

style.scss
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```



## Buenas practicas con variables locales en Angular

Aunque se permite manejar variables en el html, es recomendable no hacerlo.
Es recomendado utilizar variables locales cuando se necesita acceder a multiples veces al valor de un signal.

  ```code
@if (product()) {
  @let data = product()
  <div>
    <h1>{{data.title}}</h1>
    <p>{{data.description}}</p>
    <span>{{data.price}}</span>
  </div>
}
```


## Migración a Input Signals
La reactividad en Angular ha evolucionado significativamente con la introducción de los signals, ofreciendo un rendimiento mejorado y una reactividad más granular. Esta nueva forma de manejar los inputs no solo optimiza el tiempo de ejecución de nuestras aplicaciones, sino que también proporciona una experiencia de desarrollo más intuitiva. Veamos cómo podemos migrar nuestros proyectos existentes a este nuevo modelo de reactividad y aprovechar todas sus ventajas.


Para realizar esta migración, ejecuta el siguiente comando en tu terminal:
```bash
ng generate @angular/core:signal-input-migration
```
Nota: Despues del comando nos preguntara por algun directiorio, podemos poner . para migrar todo el proyecto o parcialmente como puede ser algun modulo => ./src/module/products
La migración transforma código como este:
```code 
@Input() name: string | undefined;

getNameLength(): number {
  return this.name ? this.name.length : -1;
}
```

En algo similar a esto:
```code 
@Input({required: true}) name = input<string>();

getNameLength(): number {
  const name = this.name();
  return name ? name.length : -1;
}
```
N
