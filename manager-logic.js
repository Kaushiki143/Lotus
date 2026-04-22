window.onload = () => updateManagerDisplay();

function processExcel(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const rows = e.target.result.split('\n');
        // Logic: Extract budget from Row 2, Column 2 of the CSV
        const startGold = parseFloat(rows[1].split(',')[1]) || 100;
        
        localStorage.setItem('base_gold', startGold);
        localStorage.removeItem('arena_data'); // Clear history for new month
        
        speak(`New month loaded. Gold reset to ${startGold}.`);
        updateManagerDisplay();
    };
    reader.readAsText(file);
}

function updateManagerDisplay() {
    let history = JSON.parse(localStorage.getItem('arena_data')) || [];
    const body = document.getElementById('ledger-body');
    body.innerHTML = "";

    if(history.length === 0) {
        body.innerHTML = "<tr><td colspan='2' style='text-align:center;'>No moves yet.</td></tr>";
        return;
    }

    history.forEach(item => {
        body.innerHTML += `
            <tr class="${item.type}">
                <td>${item.desc}</td>
                <td>${item.type === 'earning' ? '+' : '-'}$${item.amt}</td>
            </tr>`;
    });
}
