let audioEnabled = false;

function toggleAudio() {
    audioEnabled = !audioEnabled;
    const btn = document.getElementById('audioBtn');
    if (btn) {
        btn.innerText = audioEnabled ? "🔇 Disable Voice" : "🔊 Enable Voice";
    }
    speak(audioEnabled ? "Voice system initialized." : "");
}

function speak(text) {
    if (audioEnabled && text !== "") {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = 1.0;
        msg.pitch = 1.1;
        window.speechSynthesis.speak(msg);
    }
}
