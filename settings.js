document.addEventListener('DOMContentLoaded', () => {

    const savedTheme = localStorage.getItem('theme');
    const savedShortcuts = JSON.parse(localStorage.getItem('shortcuts'));
    const savedTutorials = JSON.parse(localStorage.getItem('tutorials'));


    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }


    if (savedShortcuts) {
        document.getElementById('shortcut1').value = savedShortcuts.shortcut1 || '';
        document.getElementById('shortcut2').value = savedShortcuts.shortcut2 || '';
    }


    if (savedTutorials) {
        document.getElementById('tutorials-toggle').textContent = savedTutorials.showTutorials ? 'Ocultar Tutoriales' : 'Mostrar Tutoriales';
    }


    document.getElementById('theme-light').addEventListener('click', () => {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
    });

    document.getElementById('theme-dark').addEventListener('click', () => {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    });


    document.getElementById('tutorials-toggle').addEventListener('click', () => {
        const currentText = document.getElementById('tutorials-toggle').textContent;
        const showTutorials = currentText === 'Mostrar Tutoriales';
        
        document.getElementById('tutorials-toggle').textContent = showTutorials ? 'Ocultar Tutoriales' : 'Mostrar Tutoriales';

        localStorage.setItem('tutorials', JSON.stringify({ showTutorials }));
    });

    document.getElementById('save-config').addEventListener('click', () => {
        const shortcut1 = document.getElementById('shortcut1').value;
        const shortcut2 = document.getElementById('shortcut2').value;

        const shortcuts = {
            shortcut1,
            shortcut2
        };

        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
        alert('Configuración guardada con éxito');
    });
});
