document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    sendChatBtn.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();

        if (userMessage) {

            chatMessages.innerHTML += `<div class="user-message"><strong>Yo:</strong> ${userMessage}</div>`;

            chatMessages.innerHTML += `<div class="support-message"><strong>Soporte:</strong> Gracias por tu mensaje. Nuestro equipo te responderá pronto.</div>`;
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight; 
        }
    });

    const aiInput = document.getElementById('aiInput');
    const askAIButton = document.getElementById('askAI');
    const aiResponse = document.getElementById('aiResponse');

    askAIButton.addEventListener('click', () => {
        const question = aiInput.value.trim();

        if (question) {

            if (question.toLowerCase().includes("agregar cita")) {
                aiResponse.textContent = "Para agregar una cita, ve a la sección de citas y selecciona 'Agregar nueva cita'.";
            } else if (question.toLowerCase().includes("ver resultados")) {
                aiResponse.textContent = "Para ver los resultados, entra en la sección de 'Resultados Médicos'.";
            } else {
                aiResponse.textContent = "Lo siento, no entendí tu pregunta. ¿Podrías reformularla?";
            }
        }
    });

    const remoteAssistBtn = document.getElementById('remoteAssistBtn');

    remoteAssistBtn.addEventListener('click', () => {
        alert('Tu solicitud de asistencia remota ha sido enviada. Un técnico se pondrá en contacto contigo pronto.');
    });
});
