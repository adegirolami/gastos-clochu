// script.js
function calcularDiferencia() {
    const misGastos = parseFloat(document.getElementById('misGastos').value);
    const gastosCompanera = parseFloat(document.getElementById('gastosCompanera').value);

    const totalGastos = misGastos + gastosCompanera;
    const mediaGastos = totalGastos / 2;

    let resultado = '';
    let explicacion = `<ul>
        <li>🔢 Total gastado: ${totalGastos.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</li>
        <li>💵 Cada uno debería haber gastado: ${mediaGastos.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</li>`;

    if (misGastos > mediaGastos) {
        const diferencia = misGastos - mediaGastos;
        resultado = `Lucila te debe ${diferencia.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;
        explicacion += `<li>👤 Vos gastaste ${misGastos.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}, que es ${diferencia.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} más de lo que correspondía.</li>`;
    } else if (gastosCompanera > mediaGastos) {
        const diferencia = gastosCompanera - mediaGastos;
        resultado = `Le debés ${diferencia.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} a Lucila`;
        explicacion += `<li>👩 Lucila gastó ${gastosCompanera.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}, que es ${diferencia.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} más de lo que correspondía.</li>`;
    } else {
        resultado = 'Ambos han gastado lo mismo. No se deben nada.';
        explicacion = '<li>✅ Ambos gastaron exactamente lo que correspondía.</li>';
    }

    explicacion += '</ul>';

    // Guardar en localStorage
    const entradaHistorial = {
        alejandro: misGastos, // misGastos es un número
        lucila: gastosCompanera, // gastosCompanera es un número
        mensaje: resultado, // resultado es un string
        timestamp: new Date().toISOString()
    };
    agregarAlHistorial(entradaHistorial);

    document.getElementById('resultado').innerHTML = `<strong>${resultado}</strong><br>${explicacion}`;
}

function agregarAlHistorial(entradaHistorial) {
    const HISTORIAL_KEY = 'historialGastosClochu';
    let historial = [];
    try {
        const historialGuardado = localStorage.getItem(HISTORIAL_KEY);
        if (historialGuardado) {
            historial = JSON.parse(historialGuardado);
        }
    } catch (e) {
        console.error("Error al parsear historial de localStorage:", e);
        historial = []; // Empezar con un array vacío si hay error
    }

    historial.push(entradaHistorial);

    try {
        localStorage.setItem(HISTORIAL_KEY, JSON.stringify(historial));
    } catch (e) {
        console.error("Error al guardar historial en localStorage:", e);
    }
    cargarYMostrarHistorial(); // Actualizar la vista del historial
}

function cargarYMostrarHistorial() {
    const HISTORIAL_KEY = 'historialGastosClochu';
    const historialDiv = document.getElementById('historialCalculos');

    if (!historialDiv) {
        console.error("Elemento con ID 'historialCalculos' no encontrado.");
        return;
    }

    let historial = [];
    try {
        const historialGuardado = localStorage.getItem(HISTORIAL_KEY);
        if (historialGuardado) {
            historial = JSON.parse(historialGuardado);
        }
    } catch (e) {
        console.error("Error al parsear historial de localStorage:", e);
        historialDiv.innerHTML = '<p>Error al cargar el historial.</p>';
        return;
    }

    historialDiv.innerHTML = ''; // Limpiar contenido anterior

    if (historial.length === 0) {
        historialDiv.innerHTML = '<p>No hay historial de cálculos.</p>';
        return;
    }

    const ul = document.createElement('ul');
    // Iterar en orden inverso para mostrar el más nuevo primero
    for (let i = historial.length - 1; i >= 0; i--) {
        const entrada = historial[i];
        const li = document.createElement('li');
        
        const fecha = new Date(entrada.timestamp).toLocaleString('es-ES', { 
            day: 'numeric', month: 'long', year: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });

        const alejandroGasto = (typeof entrada.alejandro === 'number') ? entrada.alejandro.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : 'N/A';
        const lucilaGasto = (typeof entrada.lucila === 'number') ? entrada.lucila.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : 'N/A';

        li.innerHTML = `
            <strong>Fecha:</strong> ${fecha}<br>
            <strong>Alejandro:</strong> ${alejandroGasto} | 
            <strong>Lucila:</strong> ${lucilaGasto}<br>
            <strong>Resultado:</strong> ${entrada.mensaje}
        `;
        ul.appendChild(li);
    }
    historialDiv.appendChild(ul);
}

// Cargar historial cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', cargarYMostrarHistorial);

function limpiarHistorial() {
    const HISTORIAL_KEY = 'historialGastosClochu';
    if (confirm('¿Estás seguro de que deseas borrar todo el historial? Esta acción no se puede deshacer.')) {
        try {
            localStorage.removeItem(HISTORIAL_KEY);
            console.log('Historial borrado de localStorage.');
        } catch (e) {
            console.error("Error al borrar el historial de localStorage:", e);
            // Opcionalmente, mostrar un mensaje de error al usuario
            alert('Error al intentar borrar el historial.');
            return; // No continuar si hay error
        }
        cargarYMostrarHistorial(); // Actualizar la vista del historial
    }
}
