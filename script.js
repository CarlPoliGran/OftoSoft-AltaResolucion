document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('news')) {
        const newsData = [
            { title: 'Nueva técnica de cirugía ocular', content: 'Descubre cómo avanzamos en la salud visual.' },
            { title: 'Semana de prevención visual', content: 'Participa en nuestras jornadas gratuitas.' },
            { title: 'Promociones en lentes', content: 'Aprovecha descuentos exclusivos.' },
            { title: 'Ahora estamos más cerca de ti', content: 'Nuevo punto en el CC Eden.' },
            { title: 'Te cuidamos sin salir de casa', content: 'Nuevo convenio EMI.' }
        ];
        localStorage.setItem('news', JSON.stringify(newsData));
    }

    const newsContainer = document.querySelector('.news-container');
    const news = JSON.parse(localStorage.getItem('news'));

    news.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `<h4>${article.title}</h4><p>${article.content}</p>`;
        newsContainer.appendChild(newsItem);
    });

    
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentSlide = 0;

    setInterval(() => {
        sliderItems[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % sliderItems.length;
        sliderItems[currentSlide].classList.add('active');
    }, 5000);

    
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => {
        alert('Redirigiendo a la página de inicio de sesión...');
        window.location.href = 'login.html';
    });

    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Sección no encontrada.');
            }
        });
    });
});

