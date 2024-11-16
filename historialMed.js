let historialConsultas = JSON.parse(localStorage.getItem('historialConsultas')) || [];


function mostrarHistorial() {
  const consultasList = document.getElementById('consultasList');
  const analisisComparativo = document.getElementById('analisisComparativo');

  consultasList.innerHTML = '';
  analisisComparativo.innerHTML = '';

  historialConsultas.forEach((consulta, index) => {
    const consultaDiv = document.createElement('div');
    consultaDiv.innerHTML = `
      <h3>Consulta #${index + 1} - ${consulta.fechaConsulta}</h3>
      <p><strong>Diagnóstico:</strong> ${consulta.diagnostico}</p>
      <p><strong>Plan de tratamiento:</strong> ${consulta.tratamiento}</p>
      <p><strong>Observaciones:</strong> ${consulta.observaciones || 'No hay observaciones'}</p>
      <button onclick="verAnalisisComparativo(${index})">Ver análisis comparativo</button>
    `;
    consultasList.appendChild(consultaDiv);
  });
}

document.getElementById('consultaForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const fechaConsulta = document.getElementById('fechaConsulta').value;
  const diagnostico = document.getElementById('diagnostico').value;
  const tratamiento = document.getElementById('tratamiento').value;
  const observaciones = document.getElementById('observaciones').value;

  if (!fechaConsulta || !diagnostico || !tratamiento) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  const consulta = {
    fechaConsulta,
    diagnostico,
    tratamiento,
    observaciones
  };

  historialConsultas.push(consulta);
  localStorage.setItem('historialConsultas', JSON.stringify(historialConsultas));

  mostrarHistorial();

  document.getElementById('consultaForm').reset();
});

function verAnalisisComparativo(index) {
  const consulta = historialConsultas[index];

  if (index > 0) {
    const consultaAnterior = historialConsultas[index - 1];
    
    const comparacion = `
      <h3>Análisis Comparativo</h3>
      <p><strong>Diagnóstico anterior:</strong> ${consultaAnterior.diagnostico}</p>
      <p><strong>Diagnóstico actual:</strong> ${consulta.diagnostico}</p>
      <p><strong>Tratamiento anterior:</strong> ${consultaAnterior.tratamiento}</p>
      <p><strong>Tratamiento actual:</strong> ${consulta.tratamiento}</p>
      <p><strong>Observaciones anteriores:</strong> ${consultaAnterior.observaciones || 'No hay observaciones'}</p>
      <p><strong>Observaciones actuales:</strong> ${consulta.observaciones || 'No hay observaciones'}</p>
    `;
    document.getElementById('analisisComparativo').innerHTML = comparacion;
  } else {
    document.getElementById('analisisComparativo').innerHTML = '<p>No hay consultas anteriores para comparar.</p>';
  }
}

mostrarHistorial();
