// Estado do jogo
let gameState = {
    attempts: 0,
    startTime: Date.now(),
    sanity: 100,
    dataCorruption: 0,
    isGameOver: false,
    fieldsCompleted: 0,
    totalFields: 7
};

// Elementos DOM
const form = document.getElementById('impossibleForm');
const submitBtn = document.getElementById('submitBtn');
const attemptsEl = document.getElementById('attempts');
const timerEl = document.getElementById('timer');
const sanityEl = document.getElementById('sanity');
const chaosNotifications = document.getElementById('chaosNotifications');

// Configurações de dificuldade ULTRA EXTREMA
const CHAOS_EVENTS = [
    { name: 'Apagar dados aleatórios', weight: 15, action: eraseRandomData },
    { name: 'Embaralhar campos', weight: 10, action: shuffleFields },
    { name: 'Roleta de caracteres', weight: 10, action: triggerCharRoulette },
    { name: 'Desafio de digitação', weight: 8, action: triggerTypingChallenge },
    { name: 'Gravidade reversa', weight: 5, action: reverseGravity },
    { name: 'Captcha Matemático', weight: 20, action: triggerMathCaptcha },
    { name: 'Palácio da Memória', weight: 15, action: triggerMemoryPalace },
    { name: 'Estados Quânticos', weight: 12, action: triggerQuantumFields },
    { name: 'Paradoxo Temporal', weight: 10, action: triggerTemporalParadox },
    { name: 'Validação Multidimensional', weight: 8, action: triggerMultidimensionalValidation }
];

// Sistema anti-gênio
let geniusDetector = {
    attempts: 0,
    patterns: [],
    adaptationLevel: 1,
    timeAnomalies: []
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    startChaosTimer();
    setupFieldObstacles();
    setupFormValidation();
});

function initializeGame() {
    gameState.attempts = 0;
    gameState.startTime = Date.now();
    gameState.sanity = 100;
    gameState.dataCorruption = 0;
    gameState.isGameOver = false;
    gameState.fieldsCompleted = 0;
    
    updateDisplay();
    disableSubmitButton();
}

function updateDisplay() {
    attemptsEl.textContent = gameState.attempts;
    sanityEl.textContent = Math.max(0, gameState.sanity);
    
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startChaosTimer() {
    setInterval(() => {
        if (!gameState.isGameOver) {
            triggerRandomChaos();
            updateDisplay();
        }
    }, 3000 + Math.random() * 5000);
}

function triggerRandomChaos() {
    const totalWeight = CHAOS_EVENTS.reduce((sum, event) => sum + event.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const event of CHAOS_EVENTS) {
        random -= event.weight;
        if (random <= 0) {
            event.action();
            showChaosNotification(event.name);
            break;
        }
    }
    
    gameState.dataCorruption += Math.random() * 5;
    updateChaosIndicators();
}

function showChaosNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'chaos-notification';
    notification.textContent = `⚠️ ${message}`;
    chaosNotifications.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Funções de caos
function eraseRandomData() {
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"]');
    const randomInput = inputs[Math.floor(Math.random() * inputs.length)];
    
    if (randomInput.value) {
        const eraseAmount = Math.floor(Math.random() * randomInput.value.length) + 1;
        randomInput.value = randomInput.value.slice(0, -eraseAmount);
        randomInput.style.background = 'rgba(255, 0, 0, 0.3)';
        setTimeout(() => {
            randomInput.style.background = '';
        }, 1000);
    }
}

function shuffleFields() {
    const fields = Array.from(document.querySelectorAll('.form-field'));
    const container = document.querySelector('.impossible-form');
    
    fields.forEach(field => {
        field.style.transform = 'scale(0.8)';
        field.style.opacity = '0.5';
    });
    
    setTimeout(() => {
        fields.sort(() => Math.random() - 0.5);
        fields.forEach(field => {
            container.appendChild(field);
            field.style.transform = 'scale(1)';
            field.style.opacity = '1';
        });
    }, 500);
}

function triggerCharRoulette() {
    const rouletteModal = document.getElementById('charRoulette');
    const display = document.getElementById('rouletteDisplay');
    const spinBtn = document.getElementById('spinRoulette');
    
    rouletteModal.style.display = 'flex';
    
    const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%'];
    
    spinBtn.onclick = () => {
        let spins = 0;
        const maxSpins = 20;
        const spinInterval = setInterval(() => {
            display.textContent = characters[Math.floor(Math.random() * characters.length)];
            spins++;
            if (spins >= maxSpins) {
                clearInterval(spinInterval);
                setTimeout(() => {
                    rouletteModal.style.display = 'none';
                }, 1000);
            }
        }, 100);
    };
}

function triggerTypingChallenge() {
    const challengeModal = document.getElementById('typingChallenge');
    const challengeInput = document.getElementById('challengeInput');
    const challengeText = document.getElementById('challengeText');
    const challengeTimer = document.getElementById('challengeTimer');
    
    const challenges = [
        "Eu sou um gênio incompreendido",
        "JavaScript é minha paixão",
        "Formulários são divertidos",
        "Debug é arte",
        "Café é vida"
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    challengeText.textContent = `Digite: "${randomChallenge}"`;
    
    challengeModal.style.display = 'flex';
    challengeInput.value = '';
    challengeInput.focus();
    
    let timeLeft = 10;
    const timer = setInterval(() => {
        timeLeft--;
        challengeTimer.textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0 || challengeInput.value === randomChallenge) {
            clearInterval(timer);
            challengeModal.style.display = 'none';
            
            if (challengeInput.value !== randomChallenge) {
                gameState.sanity -= 10;
                showChaosNotification('Desafio falhou! -10 de sanidade');
            }
        }
    }, 1000);
}

function reverseGravity() {
    document.body.style.transform = 'rotate(180deg)';
    document.body.style.transition = 'transform 2s ease';
    
    setTimeout(() => {
        document.body.style.transform = 'rotate(0deg)';
    }, 3000);
}

function setupFieldObstacles() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            // Adicionar obstáculos aleatórios
            if (Math.random() < 0.1) {
                const obstacle = e.target.parentElement.querySelector('.field-obstacle');
                obstacle.textContent = '❌';
                setTimeout(() => {
                    obstacle.textContent = '';
                }, 1000);
            }
            
            // Verificar se o campo está completo
            if (e.target.value.length > 0) {
                gameState.fieldsCompleted = Array.from(inputs).filter(i => i.value.length > 0).length;
                updateSubmitButton();
            }
        });
    });
}

function setupFormValidation() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (gameState.isGameOver) return;
        
        gameState.attempts++;
        gameState.sanity -= 5;
        
        // Verificação impossível
        const isValid = Math.random() < 0.01; // 1% de chance de sucesso
        
        if (isValid) {
            gameWin();
        } else {
            gameOver('O formulário rejeitou seus dados. Tente novamente... se tiver coragem!');
        }
        
        updateDisplay();
    });
}

function updateSubmitButton() {
    const allFieldsFilled = gameState.fieldsCompleted === gameState.totalFields;
    submitBtn.disabled = !allFieldsFilled;
    submitBtn.textContent = allFieldsFilled ? 'Enviar (Ainda Impossível)' : 'Complete todos os campos';
}

function disableSubmitButton() {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviar (Impossível)';
}

function updateChaosIndicators() {
    document.getElementById('dataCorruption').textContent = `💾 Corrupção: ${Math.floor(gameState.dataCorruption)}%`;
    document.getElementById('fieldShuffle').textContent = `🔄 Embaralhamento: ${Math.random() > 0.5 ? 'Ativo' : 'Inativo'}`;
    document.getElementById('gravityEffect').textContent = `🌍 Gravidade: ${Math.random() > 0.7 ? 'Reversa' : 'Normal'}`;
}

function gameOver(message) {
    gameState.isGameOver = true;
    const gameOverDiv = document.getElementById('gameOver');
    const gameOverMessage = document.getElementById('gameOverMessage');
    
    gameOverMessage.textContent = message;
    gameOverDiv.style.display = 'flex';
}

function gameWin() {
    gameState.isGameOver = true;
    const gameOverDiv = document.getElementById('gameOver');
    const gameOverMessage = document.getElementById('gameOverMessage');
    
    gameOverMessage.textContent = `🎉 PARABÉNS! Você conseguiu após ${gameState.attempts} tentativas!`;
    gameOverDiv.style.display = 'flex';
}

function restartGame() {
    gameState.isGameOver = false;
    document.getElementById('gameOver').style.display = 'none';
    
    // Limpar todos os campos
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    
    initializeGame();
}

// Efeitos visuais adicionais
setInterval(() => {
    if (!gameState.isGameOver && Math.random() < 0.1) {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
    }
}, 5000);

// ULTRA DIFFICULT GENIUS-LEVEL CHALLENGES

function triggerMathCaptcha() {
    const modal = createModal('🧮 Captcha Matemático Impossível');
    
    // Generate complex equation
    const a = Math.floor(Math.random() * 50) + 10;
    const b = Math.floor(Math.random() * 50) + 10;
    const c = Math.floor(Math.random() * 20) + 5;
    const operations = ['+', '-', '*', '/'];
    const op1 = operations[Math.floor(Math.random() * operations.length)];
    const op2 = operations[Math.floor(Math.random() * operations.length)];
    
    const equation = `${a} ${op1} ${b} ${op2} ${c} = ?`;
    let correctAnswer;
    
    try {
        correctAnswer = Math.round(eval(`${a} ${op1.replace('/', '/')} ${b} ${op2.replace('/', '/')} ${c}`));
    } catch {
        correctAnswer = 42;
    }
    
    modal.innerHTML += `
        <p>Resolva em 5 segundos:</p>
        <h2 style="color: #ffd93d; margin: 20px 0;">${equation}</h2>
        <input type="number" id="mathAnswer" placeholder="Resposta..." style="width: 100%; padding: 10px; font-size: 1.2em;">
        <div id="mathTimer" style="color: #ff6b6b; font-size: 1.5em; margin: 10px;">5s</div>
    `;
    
    document.body.appendChild(modal);
    
    let timeLeft = 5;
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('mathTimer').textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            const userAnswer = parseInt(document.getElementById('mathAnswer').value);
            if (userAnswer !== correctAnswer) {
                gameState.sanity -= 15;
                showChaosNotification('Matemática falhou! -15 sanidade');
            }
            modal.remove();
        }
    }, 1000);
}

function triggerMemoryPalace() {
    const modal = createModal('🏛️ Palácio da Memória');
    
    // Generate 20-character sequence
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let sequence = '';
    for (let i = 0; i < 20; i++) {
        sequence += chars[Math.floor(Math.random() * chars.length)];
    }
    
    modal.innerHTML += `
        <p>Memorize esta sequência em 10 segundos:</p>
        <h2 style="color: #ffd93d; font-family: monospace; letter-spacing: 2px; margin: 20px 0;">${sequence}</h2>
        <button onclick="this.nextElementSibling.style.display='block'; this.style.display='none'; startMemoryTest(sequence)">Pronto!</button>
        <div style="display: none;">
            <input type="text" id="memoryInput" placeholder="Digite a sequência..." style="width: 100%; padding: 10px; font-size: 1.1em;">
            <button onclick="checkMemory(sequence)">Verificar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.querySelector('h2').style.display = 'none';
    }, 10000);
}

function triggerQuantumFields() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const originalValue = input.value;
        const quantumStates = [originalValue, '', 'undefined', 'null', 'NaN'];
        
        // Make field exist in multiple states
        const quantumInterval = setInterval(() => {
            input.value = quantumStates[Math.floor(Math.random() * quantumStates.length)];
            input.style.borderColor = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#ff00ff'][Math.floor(Math.random() * 4)];
        }, 500);
        
        setTimeout(() => {
            clearInterval(quantumInterval);
            input.value = originalValue;
            input.style.borderColor = '#4ecdc4';
        }, 8000);
    });
    
    showChaosNotification('Campos quânticos ativados! Valores em superposição!');
}

function triggerTemporalParadox() {
    const modal = createModal('⏰ Paradoxo Temporal');
    
    modal.innerHTML += `
        <p>Você tem 3 segundos para prever um número que será gerado no futuro:</p>
        <input type="number" id="futurePrediction" placeholder="Preveja o número..." style="width: 100%; padding: 10px; font-size: 1.2em;">
        <button onclick="checkTemporalParadox()">Prever</button>
        <div id="temporalResult" style="margin-top: 20px; font-size: 1.3em;"></div>
    `;
    
    document.body.appendChild(modal);
    
    window.checkTemporalParadox = () => {
        const prediction = parseInt(document.getElementById('futurePrediction').value);
        const futureNumber = Math.floor(Math.random() * 1000);
        
        const result = document.getElementById('temporalResult');
        if (prediction === futureNumber) {
            result.innerHTML = `<span style="color: #00ff00;">✓ Correto! Você quebrou o espaço-tempo!</span>`;
        } else {
            result.innerHTML = `<span style="color: #ff0000;">✗ Errado! O número era ${futureNumber}. Paradoxo criado!</span>`;
            gameState.sanity -= 20;
            showChaosNotification('Paradoxo temporal! -20 sanidade');
        }
        
        setTimeout(() => modal.remove(), 3000);
    };
}

function triggerMultidimensionalValidation() {
    const modal = createModal('🌌 Validação Multidimensional');
    
    const dimensions = [
        { name: 'X', color: '#ff6b6b' },
        { name: 'Y', color: '#4ecdc4' },
        { name: 'Z', color: '#ffd93d' },
        { name: 'W', color: '#ff00ff' }
    ];
    
    modal.innerHTML += `
        <p>Valide seu CPF em 4 dimensões simultâneas:</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
            ${dimensions.map(dim => `
                <div>
                    <label style="color: ${dim.color};">Dimensão ${dim.name}:</label>
                    <input type="text" class="dimension-input" data-dim="${dim.name}" 
                           placeholder="CPF na dimensão ${dim.name}" style="width: 100%; padding: 5px;">
                </div>
            `).join('')}
        </div>
        <button onclick="checkMultidimensional()">Validar Todas Dimensões</button>
        <div id="dimensionResult"></div>
    `;
    
    document.body.appendChild(modal);
    
    window.checkMultidimensional = () => {
        const inputs = modal.querySelectorAll('.dimension-input');
        const cpfs = Array.from(inputs).map(input => input.value);
        
        // All must be valid CPFs but different
        const validCpfs = cpfs.filter(cpf => isValidCPF(cpf));
        const allDifferent = new Set(cpfs).size === 4;
        
        const result = document.getElementById('dimensionResult');
        if (validCpfs.length === 4 && allDifferent) {
            result.innerHTML = '<span style="color: #00ff00;">✓ Multidimensional validado!</span>';
        } else {
            result.innerHTML = '<span style="color: #ff0000;">✗ Falha multidimensional!</span>';
            gameState.sanity -= 25;
            showChaosNotification('Falha multidimensional! -25 sanidade');
        }
        
        setTimeout(() => modal.remove(), 3000);
    };
}

// Helper functions for ultra-difficulty
function createModal(title) {
    const modal = document.createElement('div');
    modal.className = 'roulette-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="roulette-content">
            <h3>${title}</h3>
            <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 10px; right: 10px;">✕</button>
        </div>
    `;
    return modal;
}

function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

function startMemoryTest(sequence) {
    window.sequence = sequence;
}

function checkMemory(sequence) {
    const userInput = document.getElementById('memoryInput').value;
    if (userInput !== sequence) {
        gameState.sanity -= 30;
        showChaosNotification('Memória falhou! -30 sanidade');
    }
}

// Enhanced form validation with AI anti-cheat
function setupFormValidation() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (gameState.isGameOver) return;
        
        gameState.attempts++;
        geniusDetector.attempts++;
        gameState.sanity -= 10;
        
        // AI learns patterns
        const inputPattern = Array.from(form.querySelectorAll('input')).map(input => ({
            field: input.id,
            length: input.value.length,
            timestamp: Date.now()
        }));
        geniusDetector.patterns.push(inputPattern);
        
        // Adapt difficulty based on patterns
        if (geniusDetector.attempts > 5) {
            geniusDetector.adaptationLevel = Math.min(5, geniusDetector.attempts / 5);
        }
        
        // Ultra-impossible validation
        const baseChance = 0.001; // 0.1% base chance
        const adaptationPenalty = geniusDetector.adaptationLevel * 0.0002;
        const quantumFactor = Math.random() * Math.random() * Math.random();
        const geniusFactor = Math.sin(gameState.attempts * 0.1) * 0.0001;
        
        const successChance = Math.max(0.0001, baseChance - adaptationPenalty + geniusFactor);
        const isValid = quantumFactor < successChance;
        
        // Schrödinger's submit button
        submitBtn.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
        
        if (isValid) {
            gameWin();
        } else {
            const messages = [
                'O formulário detectou padrões de gênio e se adaptou.',
                'A inteligência artificial prevê sua próxima jogada.',
                'Paradoxo quântico: você simultaneamente acertou e errou.',
                'Validação multidimensional falhou em 7 dimensões.',
                'O tempo se reverteu e apagou seus dados.'
            ];
            const message = messages[Math.floor(Math.random() * messages.length)];
            gameOver(message);
        }
        
        updateDisplay();
    });
}

// Easter egg: Ultra Konami Code (requires perfect timing)
let ultraKonami = [];
const ultraSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13, 27];
let ultraStartTime = null;

document.addEventListener('keydown', (e) => {
    if (!ultraStartTime) ultraStartTime = Date.now();
    
    const timeElapsed = Date.now() - ultraStartTime;
    if (timeElapsed > 3000) {
        ultraKonami = [];
        ultraStartTime = Date.now();
    }
    
    ultraKonami.push(e.keyCode);
    if (ultraKonami.length > ultraSequence.length) {
        ultraKonami.shift();
    }
    
    if (ultraKonami.join(',') === ultraSequence.join(',')) {
        // Even the ultra code has a 50% chance of failure
        if (Math.random() > 0.5) {
            gameState.sanity = 100;
            showChaosNotification('🎮 ULTRA KONAMI! Mas o sistema se adaptou...');
        } else {
            gameState.sanity -= 50;
            showChaosNotification('🎮 ULTRA KONAMI falhou! O sistema é mais esperto!');
        }
        ultraKonami = [];
        ultraStartTime = null;
    }
});

// Time anomaly detector
setInterval(() => {
    if (!gameState.isGameOver) {
        const timeAnomaly = {
            timestamp: Date.now(),
            sanity: gameState.sanity,
            corruption: gameState.dataCorruption
        };
        geniusDetector.timeAnomalies.push(timeAnomaly);
        
        // If too many anomalies, create temporal paradox
        if (geniusDetector.timeAnomalies.length > 10) {
            geniusDetector.timeAnomalies = [];
            triggerTemporalParadox();
        }
    }
}, 10000);
