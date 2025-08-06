// script.js

// Cargar el historial cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    mostrarHistorial();
});

function calcularDiferencia() {
    const misGastosInput = document.getElementById('misGastos').value.trim();
    const gastosCompaneraInput = document.getElementById('gastosCompanera').value.trim();

    if (!misGastosInput || !gastosCompaneraInput) {
        alert('Por favor, ingresa ambos valores.');
        return;
    }

    const misGastos = parseFloat(misGastosInput);
    const gastosCompanera = parseFloat(gastosCompaneraInput);

    if (isNaN(misGastos) || isNaN(gastosCompanera) || misGastos < 0 || gastosCompanera < 0) {
        alert('Por favor, ingresa valores numéricos válidos (no negativos).');
        return;
    }

    const totalGastos = misGastos + gastosCompanera;
    const mediaGastos = totalGastos / 2;

    let resultadoTexto = '';
    let explicacionHTML = `<ul>
        <li>🔢 Total gastado: ${totalGastos.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</li>
        <li>💵 Cada uno debería haber gastado: ${mediaGastos.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</li>`;

    if (misGastos > mediaGastos) {
        const diferencia = misGastos - mediaGastos;
        resultadoTexto = `Lucila te debe ${diferencia.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}`;
        explicacionHTML += `<li>👤 Vos gastaste ${misGastos.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}, ${diferencia.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})} más de tu parte.</li>`;
    } else if (gastosCompanera > mediaGastos) {
        const diferencia = gastosCompanera - mediaGastos;
        resultadoTexto = `Le debés ${diferencia.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})} a Lucila`;
        explicacionHTML += `<li>👩 Lucila gastó ${gastosCompanera.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}, ${diferencia.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})} más de su parte.</li>`;
    } else {
        resultadoTexto = 'Están a mano, no se deben nada.';
        explicacionHTML = '<li>✅ Ambos gastaron exactamente lo que correspondía.</li>';
    }

    explicacionHTML += '</ul>';

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<strong>${resultadoTexto}</strong><br>${explicacionHTML}`;

    // Guardar el cálculo en el historial
    guardarCalculo(misGastos, gastosCompanera, resultadoTexto);
    mostrarHistorial();
}

function guardarCalculo(gastosAle, gastosLuci, resultado) {
    const historial = JSON.parse(localStorage.getItem('historialCalculos')) || [];
    
    const nuevoCalculo = {
        fecha: new Date().toISOString(),
        gastosAle: gastosAle,
        gastosLuci: gastosLuci,
        resultado: resultado
    };

    historial.unshift(nuevoCalculo); // Añadir al principio para ver los más recientes primero
    
    // Limitar el historial a un número máximo de entradas, por ejemplo 50
    if (historial.length > 50) {
        historial.pop();
    }

    localStorage.setItem('historialCalculos', JSON.stringify(historial));
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historialCalculos')) || [];
    const historialContainer = document.getElementById('historial-container');
    const historialLista = document.getElementById('historial-lista');

    historialLista.innerHTML = ''; // Limpiar la lista actual

    if (historial.length === 0) {
        historialContainer.style.display = 'none';
        return;
    }

    historialContainer.style.display = 'block';

    historial.forEach(calculo => {
        const fecha = new Date(calculo.fecha);
        const fechaFormateada = `${fecha.toLocaleDateString('es-ES')} - ${fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="fecha">${fechaFormateada}</span>
            <div class="detalle">
                <strong>Ale:</strong> ${calculo.gastosAle.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})} |
                <strong>Luci:</strong> ${calculo.gastosLuci.toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}
            </div>
            <div class="resultado-historial">${calculo.resultado}</div>
        `;
        historialLista.appendChild(li);
    });
}

function limpiarHistorial() {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('historialCalculos');
        mostrarHistorial();
    }
}

function reiniciarCalculadora() {
    document.getElementById('misGastos').value = '';
    document.getElementById('gastosCompanera').value = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('misGastos').focus();
}

