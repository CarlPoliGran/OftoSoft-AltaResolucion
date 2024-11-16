document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('notificaciones')) {
        const notificaciones = [
            { id: 1, tipo: 'Cita', mensaje: 'Cita con oftalmólogo el 22 de Noviembre a las 10:00 AM.', fecha: '2024-11-22T10:00:00', estado: 'pendiente' },
            { id: 2, tipo: 'Medicamento', mensaje: 'Tomar medicamento para la vista (Lunes a Viernes).', fecha: '2024-11-17T08:00:00', estado: 'pendiente' },
        ];
        localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    }

    cargarNotificaciones();

    const modal = document.getElementById('modal');
    const cerrarModal = document.getElementById('cerrar');
    cerrarModal.addEventListener('click', () => modal.style.display = 'none');

    const agregarRecordatorio = document.getElementById('agregar-recordatorio');
    agregarRecordatorio.addEventListener('click', () => {
        const nuevoRecordatorio = {
            id: Date.now(),
            tipo: 'Nuevo Recordatorio',
            mensaje: 'Este es un recordatorio de prueba.',
            fecha: new Date().toISOString(),
            estado: 'pendiente',
        };
        let notificaciones = JSON.parse(localStorage.getItem('notificaciones'));
        notificaciones.push(nuevoRecordatorio);
        localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
        cargarNotificaciones();
    });
});

function cargarNotificaciones() {
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones'));
    const listaNotificaciones = document.getElementById('lista-notificaciones');
    listaNotificaciones.innerHTML = '';

    notificaciones.forEach(notificacion => {
        const div = document.createElement('div');
        div.classList.add('notification');
        div.innerHTML = `
            <p><strong>${notificacion.tipo}</strong></p>
            <p>${notificacion.mensaje}</p>
            <p><small>${new Date(notificacion.fecha).toLocaleString()}</small></p>
            <button class="ver-detalle" data-id="${notificacion.id}">Ver detalles</button>
        `;
        listaNotificaciones.appendChild(div);
    });

 
    const botonesDetalle = document.querySelectorAll('.ver-detalle');
    botonesDetalle.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            mostrarModal(id);
        });
    });
}

function mostrarModal(id) {
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones'));
    const notificacion = notificaciones.find(n => n.id == id);

    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = `¿Deseas confirmar, reprogramar o ajustar el recordatorio de: ${notificacion.mensaje}?`;


    const modal = document.getElementById('modal');
    const confirmar = document.getElementById('confirmar');
    const reprogramar = document.getElementById('reprogramar');
    const ajustar = document.getElementById('ajustar');
    const reprogramarForm = document.getElementById('reprogramar-form');
    const nuevaFechaInput = document.getElementById('nueva-fecha');
    const guardarReprogramacion = document.getElementById('guardar-reprogramacion');


    const ajustarForm = document.getElementById('ajustar-form');
    const eliminarRecordatorio = document.getElementById('eliminar-recordatorio');
    const marcarComoRealizado = document.getElementById('marcar-como-realizado');
    const posponerRecordatorio = document.getElementById('posponer-recordatorio');

 
    reprogramar.onclick = () => {
        reprogramarForm.style.display = 'block';
        ajustarForm.style.display = 'none'; 
        nuevaFechaInput.value = ""; 
        nuevaFechaInput.focus();
    };

   
    confirmar.onclick = () => {
        notificacion.estado = 'confirmado';
        localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
        modal.style.display = 'none';
        cargarNotificaciones();
    };

   
    guardarReprogramacion.onclick = () => {
        const nuevaFecha = nuevaFechaInput.value;
        if (nuevaFecha) {
            notificacion.fecha = nuevaFecha; 
            localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
            modal.style.display = 'none';
            cargarNotificaciones();
        } else {
            alert("Por favor, selecciona una fecha válida.");
        }
    };

    
    ajustar.onclick = () => {
        ajustarForm.style.display = 'block'; 
        reprogramarForm.style.display = 'none';
    };

  
    eliminarRecordatorio.onclick = () => {
        const index = notificaciones.findIndex(n => n.id === id);
        if (index !== -1) {
            notificaciones.splice(index, 1);
            localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
            modal.style.display = 'none';
            cargarNotificaciones();
        }
    };

  
    marcarComoRealizado.onclick = () => {
        notificacion.estado = 'realizado';
        localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
        modal.style.display = 'none';
        cargarNotificaciones();
    };

 
    posponerRecordatorio.onclick = () => {
        const nuevaFecha = prompt("¿Cuándo deseas recordar este recordatorio? (Por favor ingresa la fecha y hora en formato YYYY-MM-DDTHH:MM)");
        if (nuevaFecha) {
            notificacion.fecha = nuevaFecha; 
            localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
            modal.style.display = 'none';
            cargarNotificaciones();
        } else {
            alert("Por favor ingresa una fecha válida.");
        }
    };

  
    cerrar.onclick = () => {
        modal.style.display = 'none';
    };

    modal.style.display = 'flex';
}





