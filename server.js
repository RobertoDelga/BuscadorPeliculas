
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/peliculas', async (req, res) => {
    const nombre = typeof req.query.nombre === 'string'
        ? req.query.nombre.trim()
        : '';

    if (!nombre) {
        return res.status(400).json({
            error: 'Escribe el nombre de una película.'
        });
    }

    try {
        const url =
            `https://v3-cinemeta.strem.io/catalog/movie/top/search=${encodeURIComponent(nombre)}.json`;

        console.log('Buscando:', nombre);

        const respuesta = await fetch(url, {
            signal: AbortSignal.timeout(10000)
        });

        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // Buscar los detalles de cada película
        const peliculas = await Promise.all(
            (datos.metas || []).slice(0, 10).map(
                async (pelicula) => {
                    let detalle = pelicula;

                    try {
                        const urlDetalle =
                            `https://v3-cinemeta.strem.io/meta/movie/${encodeURIComponent(pelicula.id)}.json`;

                        const respuestaDetalle = await fetch(
                            urlDetalle,
                            { signal: AbortSignal.timeout(8000) }
                        );

                        if (respuestaDetalle.ok) {
                            const datosDetalle =
                                await respuestaDetalle.json();

                            detalle = datosDetalle.meta || pelicula;
                        }
                    } catch (error) {
                        console.log('Sin detalle:', pelicula.id);
                    }

                    return {
                        titulo: detalle.name || pelicula.name,
                        anio: detalle.releaseInfo ||
                            pelicula.releaseInfo ||
                            'Desconocido',
                        sinopsis: detalle.description ||
                            pelicula.description ||
                            'Sinopsis no disponible.'
                    };
                }
            )
        );

        console.log('Resultados:', peliculas.length);

        return res.json(peliculas);

    } catch (error) {
        console.error('Error:', error.message);

        return res.status(502).json({
            error: 'No se pudo consultar la API de películas.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
