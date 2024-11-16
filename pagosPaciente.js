document.addEventListener("DOMContentLoaded", function() {
    const invoiceList = document.getElementById('invoice-list');
    const paymentOptions = document.getElementById('payment-options');
    const selectedInvoiceInfo = document.getElementById('selected-invoice-info');
    let selectedInvoice = null;

    invoiceList.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('select-invoice-btn')) {
            const invoiceItem = e.target.closest('.invoice-item');
            selectedInvoice = {
                id: invoiceItem.dataset.id,
                description: invoiceItem.querySelector('.invoice-description').textContent,
                amount: invoiceItem.querySelector('.invoice-amount').textContent
            };

            selectedInvoiceInfo.textContent = `Factura seleccionada: ${selectedInvoice.description} - ${selectedInvoice.amount}`;

            paymentOptions.style.display = 'block';
        }
    });

    document.querySelectorAll('.payment-button').forEach(button => {
        button.addEventListener('click', function() {
            const paymentMethod = this.querySelector('img').alt;
            alert(`Iniciando pago con ${paymentMethod} para la factura: ${selectedInvoice.description}`);

        });
    });
});

