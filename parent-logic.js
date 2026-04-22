const MY_FAMILY_ID = localStorage.getItem('family_id');

async function calculate() {
    // The Parent asks the database: 
    // "Give me only the items that belong to MY family ID"
    const response = await fetch(`/api/expenses?family_id=${MY_FAMILY_ID}`);
    const items = await response.json();

    const totalBudget = 100; // This could also be fetched from the database
    let spent = 0;
    const tableBody = document.getElementById('expense-body');
    tableBody.innerHTML = "";

    items.forEach(item => {
        spent += parseFloat(item.cost);
        tableBody.innerHTML += `
            <tr>
                <td>${item.item_name}</td>
                <td>$${item.cost}</td>
            </tr>`;
    });

    const remaining = totalBudget - spent;
    document.getElementById('balance-val').innerText = `$${remaining.toFixed(2)}`;

    // Automatic Flagging for THIS parent only
    const card = document.getElementById('balance-card');
    if (remaining <= 10) {
        card.className = "status-box warning-budget";
        speak("Warning: Your student's spending has left you with less than ten dollars.");
    }
}

    const remaining = total - spent;
    const card = document.getElementById('balance-card');
    document.getElementById('balance-val').innerText = `$${remaining.toFixed(2)}`;
    
    card.className = (remaining <= 10) ? "status-box warning-budget" : "status-box";
}

function remove(i) {
    let items = JSON.parse(localStorage.getItem('sharedBudgetItems'));
    items.splice(i, 1);
    localStorage.setItem('sharedBudgetItems', JSON.stringify(items));
    calculate();
}

window.onload = calculate;
