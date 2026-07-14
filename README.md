# 🔁 Taller — Bucles Infinitos en React

> Proyecto educativo desarrollado en **React + Vite** que demuestra dos errores comunes que generan bucles infinitos o re-renders excesivos, junto con sus versiones corregidas y documentadas.

---

## 📌 Descripción general

En el desarrollo con React es frecuente cometer errores que provocan que los componentes se rendericen de forma continua e incontrolable. Este taller identifica, reproduce y corrige dos de los casos más comunes:

| # | Error | Causa principal |
|---|-------|----------------|
| 1 | Bucle infinito con `useEffect` | Falta del arreglo de dependencias `[]` |
| 2 | Too many re-renders | Llamada directa a `setState` dentro del cuerpo del componente |

> ⚠️ Los componentes con error están **comentados en `App.jsx`** para evitar bloquear el navegador. Solo se activan con fines demostrativos.

---

## 🚀 Instalación y ejecución local

### Requisitos previos
- Node.js v18 o superior
- npm v9 o superior
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/arturocueva81/taller-bucles-infinitos.git

# 2. Ingresar al directorio del proyecto
cd taller-bucles-infinitos

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev
```

Abre el navegador en: `http://localhost:5173`

---

## 📁 Estructura del proyecto

```
taller-bucles-infinitos/
├── public/
├── src/
│   ├── casos/
│   │   ├── caso1/
│   │   │   ├── ConBucleInfinito.jsx   ← ❌ versión con error
│   │   │   └── SinBucleInfinito.jsx   ← ✅ versión corregida
│   │   └── caso2/
│   │       ├── ConMuchosRenders.jsx   ← ❌ versión con error
│   │       └── SinMuchosRenders.jsx   ← ✅ versión corregida
│   ├── App.jsx                        ← componente raíz
│   └── main.jsx                       ← punto de entrada
├── descripcion.md                     ← este archivo
├── package.json
└── vite.config.js
```

---

## ⚠️ Caso 1: `useEffect` sin arreglo de dependencias

### ¿Qué ocurre cuando se ejecuta la versión con error?

El navegador se congela o se vuelve extremadamente lento. El componente entra en un ciclo sin fin de renders que consume toda la memoria RAM disponible, haciendo que la pestaña deje de responder.

### ¿Por qué se produce el bucle infinito?

`useEffect` **sin segundo argumento** se ejecuta después de **cada render** del componente. En la versión con error, dentro del efecto se llama a `setContador()`, lo que actualiza el estado. Cada actualización de estado provoca un nuevo render, que vuelve a ejecutar el efecto, que vuelve a actualizar el estado, generando el siguiente ciclo:

```
render → useEffect → setContador() → render → useEffect → setContador() → ...
```

### Síntomas en la aplicación, navegador o consola

- 🌐 El navegador muestra: *"This page is slowing down your browser"*
- 🖥️ La consola registra miles de renders por segundo
- ❄️ La pestaña del navegador se congela y deja de responder
- 📈 El uso de memoria RAM aumenta de forma continua

### ¿Cómo se solucionó?

Se agregó un **arreglo vacío `[]`** como segundo argumento de `useEffect`. Este arreglo define las dependencias del efecto. Al estar vacío, React entiende que el efecto no depende de ningún valor y solo debe ejecutarse **una vez**, al montar el componente.

```jsx
// ❌ Con error — se ejecuta en cada render
useEffect(() => {
  setContador(contador + 1);
});

// ✅ Corregido — se ejecuta solo al montar el componente
useEffect(() => {
  setContador(contador + 1);
}, []);
```

### Diferencia entre versiones

| | Versión con error | Versión corregida |
|---|---|---|
| **Segundo argumento** | Ninguno | `[]` |
| **Cuándo se ejecuta** | En cada render | Solo al montar |
| **Resultado** | Bucle infinito | Funciona correctamente |
| **Archivo** | `ConBucleInfinito.jsx` | `SinBucleInfinito.jsx` |

---

## ⚠️ Caso 2: Too many re-renders

### ¿Qué ocurre cuando se ejecuta la versión con error?

React lanza el error: **"Too many re-renders. React limits the number of renders to prevent an infinite loop."** La aplicación deja de renderizarse por completo y la pantalla queda en blanco.

### ¿Por qué se produce el error?

En la versión con error, `setContador(contador + 1)` se llama **directamente en el cuerpo del componente**, fuera de cualquier función o manejador de evento. React ejecuta esto durante el propio render, lo que actualiza el estado de inmediato, lo que provoca un nuevo render, generando el siguiente ciclo:

```
render → setContador() → render → setContador() → render → ...
```

React detecta este comportamiento y corta el ciclo lanzando el error para proteger al navegador.

### Síntomas en la aplicación, navegador o consola

- ⬜ La pantalla queda completamente en blanco
- 🔴 La consola muestra: *"Too many re-renders. React limits the number of renders to prevent an infinite loop"*
- 🚫 No es posible interactuar con ningún elemento de la página
- 🔄 La aplicación queda inutilizable hasta recargar la página

### ¿Cómo se solucionó?

Se envolvió `setContador` dentro de una función llamada `incrementar` y se pasó como **referencia** al evento `onClick`. De esta forma, la actualización del estado solo ocurre cuando el usuario hace clic, no durante el render del componente.

```jsx
// ❌ Con error — setContador se ejecuta durante el render
<button onClick={setContador(contador + 1)}>Incrementar</button>

// ✅ Corregido — se pasa la referencia a la función, no su ejecución
const incrementar = () => {
  setContador(contador + 1);
};
<button onClick={incrementar}>Incrementar</button>
```

### Diferencia entre versiones

| | Versión con error | Versión corregida |
|---|---|---|
| **onClick** | `{setContador(contador + 1)}` | `{incrementar}` |
| **Cuándo se ejecuta** | Durante el render | Solo al hacer clic |
| **Resultado** | "Too many re-renders" | Funciona correctamente |
| **Archivo** | `ConMuchosRenders.jsx` | `SinMuchosRenders.jsx` |

---

## 💡 Conceptos clave aprendidos

| Concepto | Descripción |
|----------|-------------|
| `useEffect` | Hook que ejecuta efectos secundarios. Requiere un arreglo de dependencias para controlar cuándo se ejecuta |
| Arreglo de dependencias `[]` | Indica a React que el efecto solo se ejecuta al montar el componente |
| Re-render | React vuelve a ejecutar el componente cada vez que su estado o props cambian |
| Referencia vs ejecución | `onClick={funcion}` pasa la referencia. `onClick={funcion()}` ejecuta la función directamente |

---

## ✅ Checklist de entrega

- [x] Caso 1 — versión con error (`ConBucleInfinito.jsx`)
- [x] Caso 1 — versión corregida (`SinBucleInfinito.jsx`)
- [x] Caso 2 — versión con error (`ConMuchosRenders.jsx`)
- [x] Caso 2 — versión corregida (`SinMuchosRenders.jsx`)
- [x] Versiones corregidas activas por defecto en `App.jsx`
- [x] Comentarios en el código identificando los errores
- [x] Documentación completa
- [x] Repositorio público y accesible

---

## 🔗 Repositorio

👉 [github.com/arturocueva81/taller-bucles-infinitos](https://github.com/arturocueva81/taller-bucles-infinitos)