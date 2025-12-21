// Memory Card Game

class MemoryGame {
    constructor() {
        this.cards = [];
        this.flipped = [];
        this.matched = 0;
        this.attempts = 0;
        this.difficulty = 'easy';
        this.gameStartTime = 0;
        this.timerInterval = null;
        this.gameActive = true;

        this.gameBoard = document.getElementById('gameBoard');
        this.difficultySelect = document.getElementById('difficulty');
        this.resetBtn = document.getElementById('resetBtn');
        this.attemptDisplay = document.getElementById('attempts');
        this.matchDisplay = document.getElementById('matches');
        this.timerDisplay = document.getElementById('timer');
        this.bestTimeDisplay = document.getElementById('bestTime');
        this.victoryScreen = document.getElementById('victoryScreen');
        this.playAgainBtn = document.getElementById('playAgainBtn');

        this.loadBestTime();
        this.attachEventListeners();
        this.initGame();
    }

    attachEventListeners() {
        this.difficultySelect.addEventListener('change', () => this.initGame());
        this.resetBtn.addEventListener('click', () => this.initGame());
        this.playAgainBtn.addEventListener('click', () => this.initGame());
    }

    initGame() {
        this.difficulty = this.difficultySelect.value;
        this.gameBoard.className = '';
        this.gameBoard.classList.add(this.difficulty);
        
        this.cards = this.generateCards();
        this.cards = this.shuffleArray(this.cards);
        this.flipped = [];
        this.matched = 0;
        this.attempts = 0;
        this.gameActive = true;
        this.gameStartTime = Date.now();
        
        this.updateDisplay();
        this.renderCards();
        this.startTimer();
        this.victoryScreen.classList.add('hidden');
    }

    generateCards() {
        const pairCount = this.difficulty === 'easy' ? 8 : this.difficulty === 'medium' ? 12 : 18;
        const emojis = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🍅', '🍆', '🌽', '🍞', '🧁', '🍰', '🎂'];
        const cards = [];
        
        for (let i = 0; i < pairCount; i++) {
            cards.push({ id: i, emoji: emojis[i], flipped: false, matched: false });
            cards.push({ id: i + 1000, emoji: emojis[i], flipped: false, matched: false });
        }
        
        return cards;
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    renderCards() {
        this.gameBoard.innerHTML = '';
        this.cards.forEach((card, index) => {
            const cardEl = document.createElement('button');
            cardEl.className = 'card';
            if (card.flipped || card.matched) cardEl.classList.add('flipped');
            if (card.matched) cardEl.classList.add('matched');
            cardEl.textContent = card.flipped || card.matched ? card.emoji : '?';
            cardEl.addEventListener('click', () => this.flipCard(index));
            this.gameBoard.appendChild(cardEl);
        });
    }

    flipCard(index) {
        if (!this.gameActive || this.flipped.length >= 2 || this.cards[index].flipped || this.cards[index].matched) return;
        
        this.cards[index].flipped = true;
        this.flipped.push(index);
        this.renderCards();
        
        if (this.flipped.length === 2) {
            this.attempts++;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [idx1, idx2] = this.flipped;
        const match = this.cards[idx1].emoji === this.cards[idx2].emoji;
        
        if (match) {
            this.cards[idx1].matched = true;
            this.cards[idx2].matched = true;
            this.matched++;
            this.flipped = [];
            
            if (this.matched === (this.difficulty === 'easy' ? 8 : this.difficulty === 'medium' ? 12 : 18)) {
                this.gameWon();
            }
        } else {
            this.gameActive = false;
            setTimeout(() => {
                this.cards[idx1].flipped = false;
                this.cards[idx2].flipped = false;
                this.flipped = [];
                this.gameActive = true;
                this.renderCards();
            }, 800);
        }
        
        this.updateDisplay();
    }

    gameWon() {
        this.gameActive = false;
        clearInterval(this.timerInterval);
        const time = Math.floor((Date.now() - this.gameStartTime) / 1000);
        
        document.getElementById('finalTime').textContent = time;
        document.getElementById('finalAttempts').textContent = this.attempts;
        
        if (!this.bestTime || time < this.bestTime) {
            this.bestTime = time;
            localStorage.setItem('memoryBestTime', this.bestTime);
            this.bestTimeDisplay.textContent = this.bestTime + 's';
        }
        
        setTimeout(() => {
            this.victoryScreen.classList.remove('hidden');
        }, 500);
    }

    startTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.gameStartTime) / 1000);
            this.timerDisplay.textContent = elapsed + 's';
        }, 100);
    }

    updateDisplay() {
        this.attemptDisplay.textContent = this.attempts;
        this.matchDisplay.textContent = this.matched;
    }

    loadBestTime() {
        this.bestTime = localStorage.getItem('memoryBestTime') || null;
        if (this.bestTime) {
            this.bestTimeDisplay.textContent = this.bestTime + 's';
        }
    }
}

const game = new MemoryGame();
