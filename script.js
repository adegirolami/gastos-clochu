// script.js
function calcularDiferencia() {
    const misGastos = parseFloat(document.getElementById('misGastos').value);
    const gastosCompanera = parseFloat(document.getElementById('gastosCompanera').value);

    const totalGastos = misGastos + gastosCompanera;
    const mediaGastos = totalGastos / 2;

    let resultado = '';
    let explicacion = `<ul>
        <li>🔢 Total gastado: $${totalGastos.toFixed(2)}</li>
        <li>💵 Cada uno debería haber gastado: $${mediaGastos.toFixed(2)}</li>`;

    if (misGastos > mediaGastos) {
        const diferencia = misGastos - mediaGastos;
        resultado = `Lucila te debe $${diferencia.toFixed(2)}`;
        explicacion += `<li>👤 Tú gastaste $${misGastos.toFixed(2)}, que es $${diferencia.toFixed(2)} más de lo que correspondía.</li>`;
    } else if (gastosCompanera > mediaGastos) {
        const diferencia = gastosCompanera - mediaGastos;
        resultado = `Le debes $${diferencia.toFixed(2)} a Lucila`;
        explicacion += `<li>👩 Lucila gastó $${gastosCompanera.toFixed(2)}, que es $${diferencia.toFixed(2)} más de lo que correspondía.</li>`;
    } else {
        resultado = 'Ambos han gastado lo mismo. No se deben nada.';
        explicacion = '<li>✅ Ambos gastaron exactamente lo que correspondía.</li>';
    }

    explicacion += '</ul>';
    document.getElementById('resultado').innerHTML = `<strong>${resultado}</strong><br>${explicacion}`;
}
