// config.js (configuración de parámetros)
// export const API_KEY = 'TU APY KEY';
// export const BASE_URL = 'https://api.themoviedb.org/3';
// export const IMG_URL = 'https://image.tmdb.org/t/p/w200';

import { API_KEY, BASE_URL } from '../config.js';

// export async function fetchBusqueda(termino, tipo) {
//     const url = `${BASE_URL}/search/${tipo}?api_key=${API_KEY}&query=${encodeURIComponent(termino)}&language=es-ES`;
//     const response = await fetch(url);
//     return await response.json();
// }

// export async function fetchTendencias() {
//     const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=es-ES`;
//     const response = await fetch(url);
//     return await response.json();
// }

// ==== AÑADIMOS LA QUERY PARA LA PAGINACIÓN
export async function fetchBusqueda(termino, tipo, pagina = 1) {
    const url = `${BASE_URL}/search/${tipo}?api_key=${API_KEY}&query=${encodeURIComponent(termino)}&language=es-ES&page=${pagina}`;
    const response = await fetch(url);
    return await response.json();
}

export async function fetchTendencias(pagina = 1) {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=es-ES&page=${pagina}`;
    const response = await fetch(url);
    return await response.json();
}

