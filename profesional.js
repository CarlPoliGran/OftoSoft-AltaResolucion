document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'profesional') {
        window.location.href = 'login.html';
    }

    document.getElementById('userName').textContent = currentUser.username;

    const appointments = [
        { time: '10:00 AM', patient: 'Mario Belalcazar', reason: 'Consulta general' },
        { time: '11:30 AM', patient: 'Sara Mendez', reason: 'Chequeo de visión' }
    ];
    
    const patients = [
        { name: 'Mario Belalcazar', diagnosis: 'Miopía' },
        { name: 'Sara Mendez', diagnosis: 'Astigmatismo' }
    ];

    const appointmentsList = document.getElementById('appointmentsList');
    appointments.forEach(appointment => {
        const li = document.createElement('li');
        li.textContent = `${appointment.time} - ${appointment.patient} (${appointment.reason})`;
        appointmentsList.appendChild(li);
    });

    const patientsList = document.getElementById('patientsList');
    patients.forEach(patient => {
        const li = document.createElement('li');
        li.textContent = `${patient.name} - Diagnóstico: ${patient.diagnosis}`;
        patientsList.appendChild(li);
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});
