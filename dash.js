document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('dashboardData')) {
        const dashboardData = {
            citas: [
                { fecha: '2024-11-01', cantidad: 10 },
                { fecha: '2024-11-02', cantidad: 12 },
                { fecha: '2024-11-03', cantidad: 8 },
                { fecha: '2024-11-04', cantidad: 15 },
                { fecha: '2024-11-05', cantidad: 20 },
            ],
            ingresos: [
                { fecha: '2024-11-01', cantidad: 50026 },
                { fecha: '2024-11-02', cantidad: 600 },
                { fecha: '2024-11-03', cantidad: 40450 },
                { fecha: '2024-11-04', cantidad: 75000 },
                { fecha: '2024-11-05', cantidad: 95900 },
            ],
            asistencia: [
                { fecha: '2024-11-01', asistieron: 8, total: 10 },
                { fecha: '2024-11-02', asistieron: 11, total: 12 },
                { fecha: '2024-11-03', asistieron: 6, total: 8 },
                { fecha: '2024-11-04', asistieron: 14, total: 15 },
                { fecha: '2024-11-05', asistieron: 18, total: 20 },
            ]
        };
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
    }

    const dashboardData = JSON.parse(localStorage.getItem('dashboardData'));

   
    const totalCitas = dashboardData.citas.reduce((acc, item) => acc + item.cantidad, 0);
    const totalIngresos = dashboardData.ingresos.reduce((acc, item) => acc + item.cantidad, 0);
    const asistenciaTotal = dashboardData.asistencia.reduce((acc, item) => acc + item.asistieron, 0);
    const porcentajeAsistencia = (asistenciaTotal / dashboardData.asistencia.reduce((acc, item) => acc + item.total, 0)) * 100;

    
    document.getElementById('total-citas').textContent = totalCitas;
    document.getElementById('total-ingresos').textContent = `$${totalIngresos}`;
    document.getElementById('porcentaje-asistencia').textContent = `${porcentajeAsistencia.toFixed(2)}%`;

   
    const citasChartCtx = document.getElementById('citas-chart').getContext('2d');
    const ingresosChartCtx = document.getElementById('ingresos-chart').getContext('2d');
    const asistenciaChartCtx = document.getElementById('asistencia-chart').getContext('2d');

    new Chart(citasChartCtx, {
        type: 'line',
        data: {
            labels: dashboardData.citas.map(item => item.fecha),
            datasets: [{
                label: 'Citas',
                data: dashboardData.citas.map(item => item.cantidad),
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                fill: true,
                tension: 0.4
            }]
        }
    });

    new Chart(ingresosChartCtx, {
        type: 'bar',
        data: {
            labels: dashboardData.ingresos.map(item => item.fecha),
            datasets: [{
                label: 'Ingresos',
                data: dashboardData.ingresos.map(item => item.cantidad),
                backgroundColor: '#03a9f4',
                borderColor: '#0288d1',
                borderWidth: 1
            }]
        }
    });

    new Chart(asistenciaChartCtx, {
        type: 'pie',
        data: {
            labels: ['Asistieron', 'No Asistieron'],
            datasets: [{
                data: [
                    asistenciaTotal,
                    dashboardData.asistencia.reduce((acc, item) => acc + item.total, 0) - asistenciaTotal
                ],
                backgroundColor: ['#4CAF50', '#f44336']
            }]
        }
    });

    const exportarReportesBtn = document.getElementById('exportar-reportes');
    exportarReportesBtn.addEventListener('click', () => {
        alert('Función de exportación en desarrollo.');
    });
});

