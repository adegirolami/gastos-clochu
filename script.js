// script.js
function calcularDiferencia() {
    const misGastosInput = document.getElementById('misGastos').value.trim();
    const gastosCompaneraInput = document.getElementById('gastosCompanera').value.trim();

    // Input validation
    if (!misGastosInput || !gastosCompaneraInput) {
        alert('Por favor, ingresa ambos valores.');
        return;
    }

    const misGastos = parseFloat(misGastosInput);
    const gastosCompanera = parseFloat(gastosCompaneraInput);

    // Validate that inputs are valid numbers and not negative
    if (isNaN(misGastos) || isNaN(gastosCompanera) || misGastos < 0 || gastosCompanera < 0) {
        alert('Por favor, ingresa valores numéricos válidos (no negativos).');
        return;
    }

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


    // Safe way to display results without XSS risk
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Clear previous content
    
    const resultadoStrong = document.createElement('strong');
    resultadoStrong.textContent = resultado;
    
    const br = document.createElement('br');
    
    const explicacionDiv = document.createElement('div');
    explicacionDiv.innerHTML = explicacion; // This is safe as explicacion is generated internally
    
    resultadoDiv.appendChild(resultadoStrong);
    resultadoDiv.appendChild(br);
    resultadoDiv.appendChild(explicacionDiv);
}

function reiniciarCalculadora() {
    // Limpiar los campos de entrada
    document.getElementById('misGastos').value = '';
    document.getElementById('gastosCompanera').value = '';
    
    // Limpiar el resultado
    document.getElementById('resultado').innerHTML = '';
    
    // Enfocar el primer campo para facilitar el uso
    document.getElementById('misGastos').focus();
}

