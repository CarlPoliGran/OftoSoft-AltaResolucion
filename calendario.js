const medicos = {
    'Dr. Juan Moreno': ['09:00', '10:00', '11:00', '14:00', '15:00'],
    'Dra. Angelica Pardo': ['09:30', '10:30', '11:30', '14:30', '15:30']
  };
  
  let citas = JSON.parse(localStorage.getItem('citas')) || [];
  
  
  document.addEventListener('DOMContentLoaded', function() {
    const calendario = new FullCalendar.Calendar(document.getElementById('calendario'), {
      initialView: 'dayGridMonth',
      locale: 'es',
      events: citas,
      dateClick: function(info) {
        mostrarFormulario(info.dateStr);
      }
    });
    calendario.render();
  });
  
  
  function mostrarFormulario(fecha) {
    document.getElementById('formCita').style.display = 'block';
    document.getElementById('mensajeCita').innerHTML = '';
    document.getElementById('hora').value = '';
    document.getElementById('paciente').value = '';
    
    
    sessionStorage.setItem('fechaCita', fecha);
  }
  
  
  document.getElementById('citaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const paciente = document.getElementById('paciente').value;
    const medico = document.getElementById('medico').value;
    const hora = document.getElementById('hora').value;
    const fecha = sessionStorage.getItem('fechaCita');
  
    if (!paciente || !medico || !hora || !fecha) {
      alert('Por favor, complete todos los campos');
      return;
    }
  
    
    if (medicos[medico].includes(hora)) {
      const cita = {
        title: `${paciente} - ${medico}`,
        start: `${fecha}T${hora}:00`,
        end: `${fecha}T${(parseInt(hora.split(':')[0]) + 1)}:00`,
        description: `Cita con ${medico}`
      };
  
      
      const colisiones = citas.filter(cita => cita.start === `${fecha}T${hora}:00`);
      if (colisiones.length > 0) {
        alert('La hora seleccionada ya está ocupada. Por favor, elija otra.');
        return;
      }
  
      
      citas.push(cita);
      localStorage.setItem('citas', JSON.stringify(citas));
  
      
      const calendario = FullCalendar.Calendar.getCalendar('calendario');
      calendario.addEvent(cita);
  
      
      document.getElementById('mensajeCita').innerHTML = '¡Cita confirmada con éxito!';
      document.getElementById('formCita').reset();
      document.getElementById('formCita').style.display = 'none';
    } else {
      alert('La hora seleccionada no está disponible para el médico.');
    }
  });
  