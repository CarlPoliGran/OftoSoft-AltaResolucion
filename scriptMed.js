function loadSampleData() {

    if (!localStorage.getItem('appointments')) {
        const sampleAppointments = [
            { date: '2024-11-16 10:00', patientName: 'Maria Barrera', description: 'Chequeo general' },
            { date: '2024-11-16 12:00', patientName: 'Daniel Vela', description: 'Control de presión ocular' },
            { date: '2024-11-17 09:00', patientName: 'Eduardo Berens', description: 'Consulta por visión borrosa' }
        ];
        localStorage.setItem('appointments', JSON.stringify(sampleAppointments));
    }

    if (!localStorage.getItem('patients')) {
        const samplePatients = [
            { 
                name: 'Maria Barrera', 
                id: '1', 
                history: 'Paciente con miopía leve. Necesita lentes.',
                contact: 'MariaBarrera@example.com',
                exams: ['Examen de fondo de ojo', 'Prueba de agudeza visual']
            },
            { 
                name: 'Daniel Vela', 
                id: '2', 
                history: 'Control de glaucoma. Medicación diaria.',
                contact: 'DanielVela@example.com',
                exams: ['Tonometría', 'Perimetría']
            },
            { 
                name: 'Eduardo Berens', 
                id: '3', 
                history: 'Consulta por visión borrosa, requiere examen completo.',
                contact: 'EduardoBerens@example.com',
                exams: ['Examen de retina', 'Prueba de refracción']
            }
        ];
        localStorage.setItem('patients', JSON.stringify(samplePatients));
    }
}

loadSampleData();

function showPatients() {
    const patientsList = document.getElementById('patientsList');
    const patients = JSON.parse(localStorage.getItem('patients')); 

    patientsList.innerHTML = '';

    patients.forEach((patient) => {
        const li = document.createElement('li');

        const patientName = document.createElement('strong');
        patientName.textContent = patient.name;

        patientName.addEventListener('click', () => openPatientModal(patient));
        li.appendChild(patientName);

        patientsList.appendChild(li);
    });
}

function openPatientModal(patient) {
    const modal = document.getElementById('patientModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <h2>${patient.name}</h2>
        <p><strong>Historia Clínica:</strong> ${patient.history}</p>
        <p><strong>Contacto:</strong> ${patient.contact}</p>
        
        <h3>Exámenes Adjuntos:</h3>
        <ul>
            ${patient.exams.map(exam => `<li>${exam}</li>`).join('')}
        </ul>
    `;

    modal.style.display = 'block';
}

function closePatientModal() {
    const modal = document.getElementById('patientModal');
    modal.style.display = 'none';
}

window.onload = function() {
    showPatients();
};




// Mostrar la lista de citas en la página de agenda
function showAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
    const appointments = JSON.parse(localStorage.getItem('appointments'));

    // Limpiar lista antes de mostrar
    appointmentsList.innerHTML = '';

    appointments.forEach((appointment, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${appointment.date}</strong><br>
            ${appointment.patientName} - ${appointment.description}
            <button onclick="editAppointment(${index})">Editar</button>
            <button onclick="deleteAppointment(${index})">Eliminar</button>
        `;
        appointmentsList.appendChild(li);
    });

    // Mostrar el número de citas
    document.getElementById('appointmentsCount').textContent = appointments.length;
}

// Agregar cita
document.getElementById('addAppointmentBtn').addEventListener('click', () => {
    const date = prompt('Fecha de la cita:');
    const patientName = prompt('Nombre del paciente:');
    const description = prompt('Descripción de la cita:');

    const appointments = JSON.parse(localStorage.getItem('appointments'));
    appointments.push({ date, patientName, description });
    localStorage.setItem('appointments', JSON.stringify(appointments));

    showAppointments();
});

// Editar cita
function editAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem('appointments'));
    const appointment = appointments[index];

    const date = prompt('Fecha de la cita:', appointment.date);
    const patientName = prompt('Nombre del paciente:', appointment.patientName);
    const description = prompt('Descripción de la cita:', appointment.description);

    appointments[index] = { date, patientName, description };
    localStorage.setItem('appointments', JSON.stringify(appointments));

    showAppointments();
}

// Eliminar cita
function deleteAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem('appointments'));
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    showAppointments();
}

// Mostrar la lista de pacientes
function showPatients() {
    const patientsList = document.getElementById('patientsList');
    const patients = JSON.parse(localStorage.getItem('patients'));

    // Limpiar lista antes de mostrar
    patientsList.innerHTML = '';

    patients.forEach((patient) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${patient.name}</strong><br>
            Historia Clínica: ${patient.history}
        `;
        patientsList.appendChild(li);
    });
}
// Función de cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();  // Limpiar sesión
    window.location.href = 'login.html'; // Redirigir a login
});

// Cargar citas al cargar la página
if (document.getElementById('appointmentsList')) {
    window.onload = showAppointments;
}

// Cargar pacientes en la página de pacientes
if (document.getElementById('patientsList')) {
    window.onload = showPatients;
}

