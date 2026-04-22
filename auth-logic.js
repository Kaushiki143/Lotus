let currentCaptcha = "";
let isLoginMode = true;

window.onload = () => generateCaptcha();

function generateCaptcha() {
    currentCaptcha = Math.random().toString(36).substring(2, 7).toUpperCase();
    document.getElementById('captcha-text').innerText = currentCaptcha;
}

function toggleForm(e) {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    document.getElementById('form-title').innerText = isLoginMode ? "Login to Arena" : "Create Account";
    document.getElementById('submit-btn').innerText = isLoginMode ? "Enter Arena" : "Join & Verify";
}

function handleAuth(e) {
    e.preventDefault();
    const captcha = document.getElementById('captcha-input').value.toUpperCase();
    const role = document.querySelector('input[name="role"]:checked').value;
    
    if (captcha !== currentCaptcha) {
        alert("Invalid Captcha");
        generateCaptcha();
        return;
    }

    if (isLoginMode) {
        window.location.href = (role === "parent") ? "parent.html" : "student.html";
    } else {
        alert("Account Created Automatically! Verification email sent (simulated). Please login.");
        toggleForm(e);
    }
}