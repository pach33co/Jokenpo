// Seleciona elementos do DOM
const buttons = document.querySelectorAll(".choice");
const message = document.getElementById("message");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const progressBar = document.getElementById("progress");

// Cria botão de reiniciar dinamicamente
const container = document.querySelector(".container");
const resetBtn = document.createElement("button");
resetBtn.textContent = "🔄 Reiniciar Jogo";
resetBtn.classList.add("reset-btn");
container.appendChild(resetBtn);
resetBtn.style.display = "none"; // começa oculto

// Variáveis de controle
let playerScore = 0;
let computerScore = 0;
let progress = 0; // porcentagem de progresso (0 a 100)
const goal = 10; // meta de vitórias

// Opções possíveis
const choices = ["pedra", "papel", "tesoura"];

// Função para gerar jogada aleatória do computador
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Função principal do jogo
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  if (playerChoice === computerChoice) {
    showMessage(`Empate! 🤝 (${playerChoice} x ${computerChoice})`, "#ffc107");
    animateResult("empate");
    return;
  }

  if (
    (playerChoice === "pedra" && computerChoice === "tesoura") ||
    (playerChoice === "papel" && computerChoice === "pedra") ||
    (playerChoice === "tesoura" && computerChoice === "papel")
  ) {
    playerScore++;
    updateProgress(true);
    showMessage(`Você ganhou! 🎉 (${playerChoice} vence ${computerChoice})`, "#00ff9d");
    animateResult("vitoria");
  } else {
    computerScore++;
    updateProgress(false);
    showMessage(`Você perdeu 😢 (${computerChoice} vence ${playerChoice})`, "#ff4d4d");
    animateResult("derrota");
  }

  updateScoreboard();
  checkGoal();
}

// Atualiza placar
function updateScoreboard() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

// Atualiza barra de progresso
function updateProgress(won) {
  if (won) {
    progress += 10;
    if (progress > 100) progress = 100;
  } else {
    progress -= 5;
    if (progress < 0) progress = 0;
  }
  progressBar.style.width = `${progress}%`;
}

// Animações visuais de resultado
function animateResult(type) {
  if (type === "vitoria") {
    document.body.style.animation = "winFlash 0.4s";
  } else if (type === "derrota") {
    document.body.style.animation = "loseShake 0.4s";
  } else {
    document.body.style.animation = "none";
  }

  // remove animação depois de um tempo
  setTimeout(() => {
    document.body.style.animation = "none";
  }, 400);
}

// Verifica se o jogador atingiu a meta de vitórias
function checkGoal() {
  if (playerScore >= goal) {
    showMessage("🎯 Parabéns! Você completou o jogo!", "#00ff9d");
    endGame();
  } else if (computerScore >= goal) {
    showMessage("💀 O computador venceu o desafio!", "#ff4d4d");
    endGame();
  }
}

// Finaliza o jogo
function endGame() {
  buttons.forEach((btn) => (btn.disabled = true));
  resetBtn.style.display = "inline-block";
}

// Reinicia tudo
resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  progress = 0;
  updateScoreboard();
  progressBar.style.width = "0px";
  showMessage("Faça sua escolha!", "#fff");
  buttons.forEach((btn) => (btn.disabled = false));
  resetBtn.style.display = "none";
});

// Mostra mensagens animadas
function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  message.style.transition = "0.3s";
}

// Ações ao clicar nos botões
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const playerChoice = btn.dataset.choice;
    playRound(playerChoice);
  });
});
