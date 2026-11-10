# Buscador de Películas 🎬

Proyecto académico con **Node.js + Express + HTML + CSS + JavaScript**.

## Requisitos

- Node.js 20 o superior.
- Conexión a Internet para consultar la API pública de iTunes.

## Cómo ejecutarlo

1. Abre una terminal dentro de la carpeta `BuscadorPeliculas`.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor:

   ```bash
   npm start
   ```

4. Abre **http://localhost:3000** en el navegador.

**Importante:** No abras `public/index.html` directamente como archivo; usa la dirección del servidor.

## Funcionamiento

- El usuario escribe el nombre de una película y presiona **Buscar**.
- `public/script.js` utiliza `fetch()` para solicitar `/api/peliculas?nombre=...`.
- `server.js` utiliza `fetch()` para consultar la API pública de iTunes.
- Node.js convierte el JSON externo a una lista de películas con **título**, **año** y **sinopsis**.
- El navegador crea tarjetas mediante el DOM, **sin recargar** la página.
- Se muestran mensajes para búsquedas vacías, películas no encontradas y errores de conexión.

La API de iTunes puede no incluir algunas películas o sinopsis y no requiere clave API para esta consulta.

## Estructura

```text
BuscadorPeliculas/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## Entrega en GitHub y Moodle

1. Crea un repositorio **público** en GitHub.
2. Sube los archivos del proyecto (sin `node_modules`).
3. Copia el enlace del repositorio.
4. En Moodle, ve a la tarea > **Agregar entrega** y pega el enlace.
5. Selecciona **Guardar cambios**, luego **Enviar tarea** y verifica que diga **Enviado para calificación**.

**Nota:** GitHub guarda el código fuente; por sí solo no ejecuta el servidor Node.js.
