/**
 * Global Accessibility Script for Lotus Arena
 * Handles Audio Assistance (Text-to-Speech)
 */

let audioEnabled = false;

// Toggles the audio state and updates the button UI if it exists on the page
function toggleAudio() {
    audioEnabled = !audioEnabled;
    const btn = document.getElementById('audioBtn');
    
    if (btn) {
        btn.innerText = audioEnabled ? "🔇 Disable Audio Assistance" : "🔊 Enable Audio Assistance";
    }

    if (audioEnabled) {
        speak("Audio assistance enabled");
    }
}

// Function to read text aloud
function speak(text) {
    if (audioEnabled) {
        // Cancel any currently playing speech to avoid overlapping
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0; // Standard speed
        utterance.pitch = 1.0; 
        window.speechSynthesis.speak(utterance);
    }
}

// Optional: Automatically add focus listeners to all inputs for better accessibility
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, button, a');
    inputs.forEach(element => {
        element.addEventListener('focus', () => {
            const textToRead = element.placeholder || element.ariaLabel || element.innerText || "Interactive element";
            speak(textToRead);
        });
    });
});