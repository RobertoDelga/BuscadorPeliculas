const formulario = document.getElementById('formBusqueda');
const input = document.getElementById('nombrePelicula');
const resultados = document.getElementById('resultados');
const mensaje = document.getElementById('mensaje');
const boton = document.getElementById('btnBuscar');

formulario.addEventListener('submit', async (event) => {
  event.preventDefault(); 
  const nombre = input.value.trim();
  resultados.replaceChildren();

  if (!nombre) {
    mensaje.textContent = 'Escribe el nombre de una película.';
    return;
  }

  mensaje.textContent = 'Buscando películas...';
  boton.disabled = true;

  try {

    const respuesta = await fetch(`/api/peliculas?nombre=${encodeURIComponent(nombre)}`);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.error || 'Error al buscar películas.');
    }

    if (datos.length === 0) {
      mensaje.textContent = 'Película no encontrada.';
      return;
    }

    mensaje.textContent = `Se encontraron ${datos.length} resultado(s).`;
    datos.forEach(mostrarPelicula);
  } catch (error) {
    mensaje.textContent = error instanceof TypeError
      ? 'Error de conexión con el servidor. Verifica que Node.js esté ejecutándose.'
      : error.message;
  } finally {
    boton.disabled = false;
  }
});

function mostrarPelicula(pelicula) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'pelicula';

  const titulo = document.createElement('h2');
  titulo.textContent = pelicula.titulo;

  const anio = document.createElement('p');
  anio.className = 'anio';
  anio.textContent = `Año: ${pelicula.anio}`;

  const sinopsis = document.createElement('p');
  sinopsis.className = 'sinopsis';
  sinopsis.textContent = pelicula.sinopsis;

  tarjeta.append(titulo, anio, sinopsis);
  resultados.appendChild(tarjeta);
}
