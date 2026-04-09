import { fetchBusqueda, fetchTendencias } from './api.js';
import { pintarResultados } from './ui.js';

// Selecciones del DOM
const inputBusqueda = document.querySelector('#busqueda');
const selectorFiltro = document.querySelector('#filtro');
const contenedor = document.querySelector('#contenedor-pelis');
const formulario = document.querySelector('#formulario-busqueda');
const tituloSeccion = document.querySelector('#titulo-seccion');
const btnLimpiar = document.querySelector('#botonLimpiar');
const cerrar = document.querySelector('#cerrar-modal');
const modal = document.querySelector('#modal-pelicula');


// ==== PAGINACIÓN ====
let paginaActual = 1;
let terminoActual = ""; // Para saber qué estamos paginando (tendencias o búsqueda)
let tipoActual = "movie";

const btnVerMas = document.querySelector('#btnVerMas');

// ==== FUNCIÓN PARA GESTIONAR LA VISIBILIDAD DEL BOTÓN VER MÁS ====
function gestionarBotonMas(totalPaginas) {
    if (paginaActual < totalPaginas) {
        btnVerMas.style.display = 'block';
    } else {
        btnVerMas.style.display = 'none';
    }
}


// ==== INICIALIZACIÓN DE LA APLICACIÓN (llamada desde DOMContentLoaded) ====

async function mostrarInicio() {
    paginaActual = 1;
    terminoActual = "";
    const data = await fetchTendencias(paginaActual);
    tituloSeccion.textContent = 'Tendencias de hoy';
    pintarResultados(data.results, contenedor, 'movie', true);
    gestionarBotonMas(data.total_pages);
}

// ==== FUNCIÓN DE RESET ====
btnLimpiar.addEventListener('click', () => {
    inputBusqueda.value = '';
    selectorFiltro.value = 'movie';
    mostrarInicio();
});


// ====  EVENTO: BUSCAR (Sustituye el que tienes) ====
formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // 1. Resetear la memoria para una búsqueda nueva
    paginaActual = 1; 
    terminoActual = inputBusqueda.value.trim();
    tipoActual = selectorFiltro.value;

    if (terminoActual) {
        const data = await fetchBusqueda(terminoActual, tipoActual, paginaActual);
        tituloSeccion.textContent = `Resultados para: "${terminoActual}"`;
        
        // 2. Pintamos y actualizamos el botón
        pintarResultados(data.results, contenedor, tipoActual, true); // true = borrar lo anterior
        gestionarBotonMas(data.total_pages);
    }
});


// ==== EVENTO: VER MÁS (Sustituye el que tienes) ====
btnVerMas.addEventListener('click', async () => {
    paginaActual++; 
    
    let data;
    if (terminoActual === "") {
        // Estamos en tendencias
        data = await fetchTendencias(paginaActual);
    } else {
        // Estamos en una búsqueda activa
        data = await fetchBusqueda(terminoActual, tipoActual, paginaActual);
    }

    // IMPORTANTE: el 'false' final para que NO borre lo que ya hay en pantalla
    pintarResultados(data.results, contenedor, tipoActual, false);
    
    // Volvemos a chequear si quedan más páginas
    gestionarBotonMas(data.total_pages);
    
    // Pequeño truco: Scroll suave hacia abajo para que el usuario vea que hay contenido nuevo
    window.scrollBy({ top: 300, behavior: 'smooth' });
});



// ==== VENTANA MODAL ====

// Para cerrar el modal
cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Extra: Cerrar si hacen clic fuera de la cajita blanca
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});



// ===== INICIALIZACIÓN DE LA APLICACIÓN ====
document.addEventListener('DOMContentLoaded', mostrarInicio);