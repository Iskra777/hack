// ===== МАТРИЦА =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters = katakana.split("");
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

// ====== ФЕЙКОВЫЙ ВВОД КОМАНД ======
const inputEl = document.getElementById("input");
const outputEl = document.getElementById("output");

const fakeResponses = [
  "Запрос принят. Выполняется анализ...",
  "Ошибка: недостаточно прав доступа.",
  "Доступ к системе получен. Ожидание инструкции.",
  "Поиск уязвимостей завершён.",
  "Выполняется обход межсетевого экрана...",
  "Файл успешно скачан: secret_data.zip",
  "IP-адрес зашифрован. Уход из системы.",
  "Команда выполнена."
];

let currentInput = "";

document.addEventListener("keydown", (e) => {
  if (e.key.length === 1) {
    currentInput += e.key;
    inputEl.textContent = currentInput;
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    inputEl.textContent = currentInput;
  } else if (e.key === "Enter") {
    processCommand(currentInput);
    currentInput = "";
    inputEl.textContent = "";
  }
});

function processCommand(cmd) {
  const commandLine = document.createElement("div");
  commandLine.innerHTML = `<span class="prompt">&gt; </span>${cmd}`;
  outputEl.appendChild(commandLine);

  const response = document.createElement("div");
  response.textContent = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
  outputEl.appendChild(response);

  // Автоскролл вниз
  const terminal = document.getElementById("terminal");
  terminal.scrollTop = terminal.scrollHeight;
}