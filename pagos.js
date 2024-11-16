let facturas = JSON.parse(localStorage.getItem('facturas')) || [];
let pagos = JSON.parse(localStorage.getItem('pagos')) || [];


document.getElementById('facturaForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombrePaciente = document.getElementById('nombrePaciente').value;
  const tipoConsulta = document.getElementById('tipoConsulta').value;
  const montoConsulta = parseFloat(document.getElementById('montoConsulta').value);
  const descuento = parseFloat(document.getElementById('descuento').value);

  const descuentoAplicado = (montoConsulta * descuento) / 100;
  const totalFactura = montoConsulta - descuentoAplicado;

  const factura = {
    id: 'F' + new Date().getTime(),
    nombrePaciente,
    tipoConsulta,
    montoConsulta,
    descuento,
    totalFactura,
    fecha: new Date().toLocaleDateString(),
  };


  facturas.push(factura);
  localStorage.setItem('facturas', JSON.stringify(facturas));

  
  mostrarFacturas();


  document.getElementById('facturaForm').reset();
});


function mostrarFacturas() {
  const facturasList = document.getElementById('facturasList');
  facturasList.innerHTML = '';

  facturas.forEach(factura => {
    const facturaDiv = document.createElement('div');
    facturaDiv.innerHTML = `
      <h3>Factura ID: ${factura.id}</h3>
      <p><strong>Paciente:</strong> ${factura.nombrePaciente}</p>
      <p><strong>Consulta:</strong> ${factura.tipoConsulta}</p>
      <p><strong>Monto Consulta:</strong> $${factura.montoConsulta}</p>
      <p><strong>Descuento:</strong> ${factura.descuento}%</p>
      <p><strong>Total Factura:</strong> $${factura.totalFactura.toFixed(2)}</p>
      <p><strong>Fecha:</strong> ${factura.fecha}</p>
      <button onclick="realizarPago('${factura.id}')">Pagar</button>
    `;
    facturasList.appendChild(facturaDiv);
  });
}


document.getElementById('pagoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const idFacturaPago = document.getElementById('idFacturaPago').value;
  const montoPago = parseFloat(document.getElementById('montoPago').value);

  const factura = facturas.find(f => f.id === idFacturaPago);

  if (!factura) {
    alert('Factura no encontrada.');
    return;
  }

  const pago = {
    facturaId: idFacturaPago,
    montoPago,
    fechaPago: new Date().toLocaleDateString(),
  };


  pagos.push(pago);
  localStorage.setItem('pagos', JSON.stringify(pagos));

 
  factura.pagoTotal = (factura.pagoTotal || 0) + montoPago;

  if (factura.pagoTotal >= factura.totalFactura) {
    factura.estadoPago = 'Pagada';
  }

  localStorage.setItem('facturas', JSON.stringify(facturas));


  mostrarFacturas();


  document.getElementById('pagoForm').reset();
});


function generarReporte() {
  const reporteDiv = document.getElementById('reporte');
  reporteDiv.innerHTML = `<h3>Reporte de Pagos</h3>`;
  
  pagos.forEach(pago => {
    const factura = facturas.find(f => f.id === pago.facturaId);
    reporteDiv.innerHTML += `
      <p>Factura ID: ${pago.facturaId} - Pago: $${pago.montoPago} - Fecha de Pago: ${pago.fechaPago}</p>
    `;
  });
}

mostrarFacturas();
