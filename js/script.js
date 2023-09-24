const ButtonControl = document.getElementById("buttonControl");
const Lampada = document.querySelector(".lampada");

function ControlLamp() {
    if (ButtonControl.value === "ON") {

        ButtonControl.value = "OFF"
        ButtonControl.style.background = "#000"
        Lampada.classList.add("ligada");

    } else if (ButtonControl.value === "OFF") {

        ButtonControl.value = "ON"
        ButtonControl.style.background = "red"
        Lampada.classList.remove("ligada");

    }
}

ButtonControl.addEventListener('click', ControlLamp);

const VoiceControl = document.getElementById("voiceControl");

let recognition;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Configurações da API
    recognition.lang = 'pt-BR'; // Define o idioma para o reconhecimento de fala

    recognition.onstart = () => {
        VoiceControl.style.background = "green";
        VoiceControl.style.color = "#fff"
    };

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript.toLowerCase();
        VoiceControl.style.background = "#ebebeb",
            VoiceControl.style.color = "#000"

        // Verifica os comandos de voz
        if (result.includes('acender lâmpada')) {
            Lampada.classList.add("ligada");
            ButtonControl.value = "OFF"
            ButtonControl.style.background = "#000"
        } else if (result.includes('apagar lâmpada')) {
            Lampada.classList.remove("ligada");
            ButtonControl.value = "ON"
            ButtonControl.style.background = "red"
        }
    };

    VoiceControl.addEventListener('click', () => {
        recognition.start();
    });
} else {
    transcript.textContent = 'Seu navegador não suporta a API de Reconhecimento de Fala.';
}