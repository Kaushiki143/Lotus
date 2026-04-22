// Handles selection styling
document.querySelectorAll('input[name="role"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.querySelectorAll('.role-option').forEach(opt => opt.style.borderColor = '#555');
        e.target.nextElementSibling.style.borderColor = '#FFB6C1';
    });
});

function login() {
    const pin = document.getElementById('pin-code').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    if (pin.length === 4) {
        speak(`Access granted. Loading ${role} console.`);
        window.location.href = role === 'student' ? 'student.html' : 'manager.html';
    } else {
        alert("PIN must be exactly 4 digits.");
        speak("Invalid PIN. Try again.");
    }
}
