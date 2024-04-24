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
    document.getElementById('resultado').innerHTML = `<strong>${resultado}</strong><br>${explicacion}`;
}
