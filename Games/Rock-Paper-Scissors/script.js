/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

// Rock Paper Scissors Game

class RockPaperScissors {
    constructor() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.drawScore = 0;
        
        this.choices = ['rock', 'paper', 'scissors'];
        this.resultDiv = document.getElementById('result');
        
        this.loadScores();
        this.attachEventListeners();
    }

    play(playerChoice) {
        const aiChoice = this.choices[Math.floor(Math.random() * 3)];
        const result = this.determineWinner(playerChoice, aiChoice);
        
        this.displayResult(playerChoice, aiChoice, result);
        this.updateScore(result);
    }

    determineWinner(player, ai) {
        if (player === ai) return 'draw';
        
        if (player === 'rock' && ai === 'scissors') return 'win';
        if (player === 'paper' && ai === 'rock') return 'win';
        if (player === 'scissors' && ai === 'paper') return 'win';
        
        return 'lose';
    }

    displayResult(player, ai, result) {
        const emojiMap = { rock: '🪨', paper: '📄', scissors: '✂️' };
        const resultMessages = {
            win: '🎉 You Win!',
            lose: '😢 You Lose!',
            draw: '🤝 Draw!'
        };
        
        this.resultDiv.innerHTML = `
            <p>${emojiMap[player]} vs ${emojiMap[ai]}</p>
            <p>${resultMessages[result]}</p>
        `;
    }

    updateScore(result) {
        if (result === 'win') this.playerScore++;
        else if (result === 'lose') this.aiScore++;
        else this.drawScore++;
        
        this.displayScores();
        this.saveScores();
    }

    displayScores() {
        document.getElementById('playerScore').textContent = this.playerScore;
        document.getElementById('aiScore').textContent = this.aiScore;
        document.getElementById('drawScore').textContent = this.drawScore;
    }

    saveScores() {
        localStorage.setItem('rps-player', this.playerScore);
        localStorage.setItem('rps-ai', this.aiScore);
        localStorage.setItem('rps-draw', this.drawScore);
    }

    loadScores() {
        this.playerScore = parseInt(localStorage.getItem('rps-player')) || 0;
        this.aiScore = parseInt(localStorage.getItem('rps-ai')) || 0;
        this.drawScore = parseInt(localStorage.getItem('rps-draw')) || 0;
        this.displayScores();
    }

    resetGame() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.drawScore = 0;
        this.displayScores();
        this.saveScores();
        this.resultDiv.innerHTML = '';
    }

    attachEventListeners() {
        document.getElementById('rock').addEventListener('click', () => this.play('rock'));
        document.getElementById('paper').addEventListener('click', () => this.play('paper'));
        document.getElementById('scissors').addEventListener('click', () => this.play('scissors'));
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
    }
}

const game = new RockPaperScissors();
