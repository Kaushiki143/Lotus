/**
 * Student Logic - Connects to Parent Budget via localStorage
 */

window.onload = () => {
    refreshDashboard();
};

function refreshDashboard() {
    // 1. Pull Data from Shared Storage
    const totalAllocated = parseFloat(localStorage.getItem('totalAllocated')) || 0;
    const requestedItems = JSON.parse(localStorage.getItem('sharedBudgetItems')) || [];
    
    // 2. Calculate Totals
    const totalSpent = requestedItems.reduce((sum, item) => sum + item.cost, 0);
    const remaining = totalAllocated - totalSpent;

    // 3. Update UI Elements
    const box = document.getElementById('status-box');
    const msg = document.getElementById('status-msg');
    const val = document.getElementById('remaining-val');
    const warningLabel = document.getElementById('warning-details');
    const drainingList = document.getElementById('draining-items');

    val.innerText = `$${remaining.toFixed(2)}`;

    // 4. THE ALGORITHM: Check Threshold ($10)
    if (remaining <= 10 && remaining > 0) {
        // Warning Mode
        box.className = "status-box warning-budget";
        msg.innerText = "🛑 Budget Draining!";
        warningLabel.style.display = "block";

        // Identify "Draining" Items (items over 25% of total budget)
        const expensiveItems = requestedItems.filter(i => i.cost > (totalAllocated * 0.25));
        drainingList.innerText = expensiveItems.length > 0 
            ? expensiveItems.map(i => i.name).join(", ") 
            : "Multiple small expenses.";
            
    } else if (remaining == 0 || remaining<10) {
        // Over Limit Mode
        box.className = "status-box warning-budget";
        box.style.background = "#000"; // Black out for limit exceeded
        msg.innerText = "❌ LIMIT EXCEEDED:Parent is notified.";
        remaining=100;
        warningLabel.style.display = "none";
    } else {
        // Congratulatory Mode
        box.className = "status-box good-budget";
        msg.innerText = "🌟 Keep up the great work! You're budgeting like a pro.";
        warningLabel.style.display = "none";
    }
}

