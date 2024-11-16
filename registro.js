document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const historialClinico = document.getElementById('historialClinico').value;
    const antecedentes = document.getElementById('antecedentes').value;
    const preferenciaContacto = document.getElementById('preferenciaContacto').value;
    const documentos = document.getElementById('documentos').files;
  

    if (!nombre || !fechaNacimiento || !telefono || !correo || !historialClinico || !antecedentes || !preferenciaContacto) {
      alert("Por favor, complete todos los campos.");
      return;
    }
  

    const paciente = {
      nombre,
      fechaNacimiento,
      telefono,
      correo,
      historialClinico,
      antecedentes,
      preferenciaContacto,
      documentos: Array.from(documentos).map(file => file.name)
    };
  
    localStorage.setItem('paciente', JSON.stringify(paciente));
  
    sessionStorage.setItem('nombrePaciente', nombre);

    document.getElementById('mensaje').innerText = '¡Registro exitoso!';
  
    document.getElementById('registroForm').reset();
  });
  