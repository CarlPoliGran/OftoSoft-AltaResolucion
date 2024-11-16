document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'paciente') {
        window.location.href = 'login.html';
    }

    document.getElementById('userName').textContent = currentUser.username;

    const appointments = [
        { time: '10:00 AM', doctor: 'Dr. Mario García', reason: 'Chequeo de vista' }
    ];
    
    const medicalHistory = [
        { date: '2023-09-10', diagnosis: 'Miopía', treatment: 'Gafas' },
        { date: '2023-07-22', diagnosis: 'Astigmatismo', treatment: 'Gafas' }
    ];

    const appointmentsList = document.getElementById('appointmentsList');
    appointments.forEach(appointment => {
        const li = document.createElement('li');
        li.textContent = `${appointment.time} - ${appointment.doctor} (${appointment.reason})`;
        appointmentsList.appendChild(li);
    });

    const historyList = document.getElementById('historyList');
    medicalHistory.forEach(record => {
        const li = document.createElement('li');
        li.textContent = `${record.date} - Diagnóstico: ${record.diagnosis} (Tratamiento: ${record.treatment})`;
        historyList.appendChild(li);
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});
