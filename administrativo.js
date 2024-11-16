document.addEventListener('DOMContentLoaded', () => {

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));


    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
    }


    document.getElementById('userName').textContent = currentUser.username;


    document.getElementById('appointmentsCount').textContent = 50;
    document.getElementById('patientsCount').textContent = 200;
    document.getElementById('monthlyRevenue').textContent = '$10,000';

    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});
