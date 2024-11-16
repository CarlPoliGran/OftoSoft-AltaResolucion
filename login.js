document.addEventListener('DOMContentLoaded', () => {
    
    const users = [
        { username: 'c.romero@aval.com', password: 'admin123', role: 'admin' },
        { username: 'kaguilar@aval.com', password: 'profesional123', role: 'profesional' },
        { username: 'c.gonzalez1@aval.com.co', password: 'paciente123', role: 'paciente' }
    ];

    
    localStorage.setItem('users', JSON.stringify(users));

    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        const user = storedUsers.find(u => u.username === username && u.password === password);

        if (user) {
            
            sessionStorage.setItem('currentUser', JSON.stringify(user));

            // Redirigir al usuario según su rol
            if (user.role === 'admin') {
                window.location.href = 'administrativo.html';  
            } else if (user.role === 'profesional') {
                window.location.href = 'profesional.html';  
            } else if (user.role === 'paciente') {
                window.location.href = 'paciente.html'; 
            }
        } else {
            
            errorMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
        }
    });
});
