document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('patientsData')) {
        const patientsData = [
            { name: 'Angie Caicedo', lastConsultation: '2024-10-01', diagnosis: 'Cataratas', testResults: 'Glucosa alta', treatments: 'Cirugía ocular' },
            { name: 'Laura Lopez', lastConsultation: '2024-09-20', diagnosis: 'Miopía', testResults: 'Presión ocular elevada', treatments: 'Lentes de contacto' },
            { name: 'Carlos Barreto', lastConsultation: '2024-11-05', diagnosis: 'Astigmatismo', testResults: 'Visión borrosa', treatments: 'Cirugía refractiva' },
            { name: 'Alejandro Rios', lastConsultation: '2024-08-15', diagnosis: 'Glaucoma', testResults: 'Presión ocular elevada', treatments: 'Medicamentos' },
            { name: 'Daniel Perez', lastConsultation: '2024-11-10', diagnosis: 'Cataratas', testResults: 'Glucosa normal', treatments: 'Cirugía ocular' }
        ];
        localStorage.setItem('patientsData', JSON.stringify(patientsData));
    }

    const patientsData = JSON.parse(localStorage.getItem('patientsData'));

    function showResults(results) {
        const resultsContainer = document.getElementById('patient-results');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No se encontraron pacientes.</p>';
            return;
        }

        results.forEach(patient => {
            const patientCard = document.createElement('div');
            patientCard.classList.add('patient-card');
            patientCard.innerHTML = `
                <h4>${patient.name}</h4>
                <p><strong>Última consulta:</strong> ${patient.lastConsultation}</p>
                <p><strong>Diagnóstico:</strong> ${patient.diagnosis}</p>
                <p><strong>Resultados de pruebas:</strong> ${patient.testResults}</p>
                <p><strong>Tratamientos previos:</strong> ${patient.treatments}</p>
            `;
            resultsContainer.appendChild(patientCard);
        });
    }

    // Función para aplicar filtros
    function applyFilters() {
        const lastConsultation = document.getElementById('last-consultation').value;
        const diagnosis = document.getElementById('diagnosis').value.toLowerCase();
        const testResults = document.getElementById('test-results').value.toLowerCase();
        const previousTreatments = document.getElementById('previous-treatments').value.toLowerCase();

        const filteredResults = patientsData.filter(patient => {
            const matchesConsultation = lastConsultation ? patient.lastConsultation === lastConsultation : true;
            const matchesDiagnosis = diagnosis ? patient.diagnosis.toLowerCase().includes(diagnosis) : true;
            const matchesTestResults = testResults ? patient.testResults.toLowerCase().includes(testResults) : true;
            const matchesTreatments = previousTreatments ? patient.treatments.toLowerCase().includes(previousTreatments) : true;

            return matchesConsultation && matchesDiagnosis && matchesTestResults && matchesTreatments;
        });

        showResults(filteredResults);
    }

    function autoCorrect(query) {
        const commonMistakes = ['cataras', 'miopia', 'glaucoma', 'asigmatismo'];
        const corrections = {
            'cataras': 'cataratas',
            'miopia': 'miopía',
            'asigmatismo': 'astigmatismo',
            'glaucoma': 'glaucoma'
        };

        commonMistakes.forEach(mistake => {
            if (query.includes(mistake)) {
                document.getElementById('suggestions').textContent = `¿Quisiste decir: ${corrections[mistake]}?`;
            }
        });
    }

    document.getElementById('search').addEventListener('input', (e) => {
        autoCorrect(e.target.value);
    });

    document.getElementById('search-btn').addEventListener('click', () => {
        const searchQuery = document.getElementById('search').value.toLowerCase();
        const filteredResults = patientsData.filter(patient => 
            patient.name.toLowerCase().includes(searchQuery) ||
            patient.diagnosis.toLowerCase().includes(searchQuery) ||
            patient.testResults.toLowerCase().includes(searchQuery) ||
            patient.treatments.toLowerCase().includes(searchQuery)
        );
        showResults(filteredResults);
    });

    document.getElementById('apply-filters').addEventListener('click', applyFilters);
});
