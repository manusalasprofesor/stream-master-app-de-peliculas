import { IMG_URL } from '../config.js';

// 1. SELECCIONES PROPIAS DE LA UI (Añade esto arriba)
const modal = document.querySelector('#modal-pelicula');
const tituloModal = document.querySelector('#modal-titulo');
const cuerpoModal = document.querySelector('#modal-sinopsis');

export function pintarResultados(lista, contenedor, tipoBusqueda, limpiar= true) {
    if (limpiar) {
        contenedor.innerHTML = ''; // Solo limpiamos si es una búsqueda nueva
    }
    const fragmento = document.createDocumentFragment();

    lista.forEach(item => {
        const card = document.createElement('DIV');
        card.classList.add('movie-card');
        
        const rutaImg = item.poster_path || item.profile_path;
        const src = rutaImg ? `${IMG_URL}${rutaImg}` : 'https://placehold.jp/200x300.png?text=Sin+Imagen';
        
        card.innerHTML = `
            <img src="${src}" alt="${item.title || item.name}">
            <h3>${item.title || item.name}</h3>
            ${item.vote_average ? `<span>⭐ ${item.vote_average.toFixed(1)}</span>` : ''}
        `;

        
        // Extra para el caso de que sea un actor
        card.addEventListener('click', () => {
            if (tipoBusqueda === 'person') {
             // Si es un actor, enviamos sus películas conocidas
                const pelisConocidas = item.known_for 
                    ? item.known_for.map(m => m.title || m.name).join(', ') 
                    : "Información no disponible";
                mostrarDetalles(item.name, `Conocido por: ${pelisConocidas}`, true);
            } else {
                // Si es película/serie, enviamos la sinopsis normal
                mostrarDetalles(item.title || item.name, item.overview, false);
            }
        });

        fragmento.appendChild(card);
    });
    contenedor.appendChild(fragmento);
}


export function mostrarDetalles(titulo, contenido, esActor) {
    // const tituloModal = document.querySelector('#modal-titulo');
    // const cuerpoModal = document.querySelector('#modal-sinopsis');
    
    tituloModal.textContent = titulo;
    
    if (esActor) {
        // Estilo especial para actores
        cuerpoModal.innerHTML = `<strong>🎬 Filmografía destacada:</strong><br>${contenido}`;
    } else {
        // Estilo para películas
        cuerpoModal.textContent = contenido || "Sinopsis no disponible.";
    }
    
    modal.style.display = 'flex';
}
