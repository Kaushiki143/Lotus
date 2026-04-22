function calculate() {
    const total = parseFloat(document.getElementById('total-budget').value);
    localStorage.setItem('totalAllocated', total);
    
    const items = JSON.parse(localStorage.getItem('sharedBudgetItems')) || [];
    const body = document.getElementById('expense-body');
    let spent = 0;
    
    body.innerHTML = "";
    items.forEach((item, i) => {
        spent += item.cost;
        body.innerHTML += `<tr><td>${item.name}</td><td>$${item.cost}</td>
        <td><button onclick="remove(${i})" style="width:auto; padding:5px; background:red;">Reject</button></td></tr>`;
    });

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
<script src="accessibility.js"></script>