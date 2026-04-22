window.onload = () => updatePlayerDisplay();

function addMove(type) {
    const desc = document.getElementById('desc').value;
    const amt = parseFloat(document.getElementById('amt').value);

    if (desc && amt) {
        let history = JSON.parse(localStorage.getItem('arena_data')) || [];
        history.unshift({ desc, amt, type });
        localStorage.setItem('arena_data', JSON.stringify(history));
        
        document.getElementById('desc').value = "";
        document.getElementById('amt').value = "";
        speak(type === 'expense' ? `Spent ${amt} Dollar.` : `Refilled ${amt} Dollar.`);
        updatePlayerDisplay();
    }
}

function updatePlayerDisplay() {
    const base = parseFloat(localStorage.getItem('base_gold')) || 0;
    let history = JSON.parse(localStorage.getItem('arena_data')) || [];
    let current = base;

    history.forEach(item => {
        if (item.type === 'earning') current += item.amt;
        else current -= item.amt;
    });

    document.getElementById('balance-val').innerText = `$${current.toFixed(2)}`;
    const box = document.getElementById('status-box');
    const statusText = document.getElementById('game-status');

    if (current <= 10 && current > 0) {
        box.className = "status-box warning-budget";
        statusText.innerText = "⚠️ Dollar CRITICAL (Refill Needed)";
        speak("Warning. Arena gold is low.");
    } else if (current <= 0) {
        box.style.background = "#000";
        statusText.innerText = "💀 ARENA BANKRUPT";
    } else {
        box.className = "status-box good-budget";
        statusText.innerText = "🛡️ Arena: Active";
    }
}
