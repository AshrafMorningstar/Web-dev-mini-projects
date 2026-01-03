/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

class SimonGame {
    constructor() {
        this.sequence = [];
        this.playerSequence = [];
        this.level = 0;
        this.colors = document.querySelectorAll('.quadrant');
        this.startBtn = document.getElementById('startBtn');
        this.levelDisplay = document.getElementById('level');
        this.gameActive = false;
        this.startBtn.addEventListener('click', () => this.start());
        this.colors.forEach(el => el.addEventListener('click', (e) => this.playerClick(e.target)));
    }
    start() {
        this.sequence = [];
        this.playerSequence = [];
        this.level = 0;
        this.gameActive = true;
        this.nextRound();
    }
    nextRound() {
        this.level++;
        this.levelDisplay.textContent = this.level;
        this.playerSequence = [];
        const randomColor = this.colors[Math.floor(Math.random() * 4)];
        this.sequence.push(randomColor.dataset.color);
        setTimeout(() => this.playSequence(), 500);
    }
    playSequence() {
        this.gameActive = false;
        let delay = 0;
        for (let color of this.sequence) {
            setTimeout(() => this.flash(color), delay);
            delay += 600;
        }
        setTimeout(() => { this.gameActive = true; }, delay);
    }
    flash(color) {
        const el = document.querySelector(`[data-color="${color}"]`);
        el.style.filter = 'brightness(1.5)';
        setTimeout(() => { el.style.filter = 'brightness(1)'; }, 300);
    }
    playerClick(element) {
        if (!this.gameActive) return;
        const color = element.dataset.color;
        this.playerSequence.push(color);
        this.flash(color);
        if (this.playerSequence[this.playerSequence.length - 1] !== this.sequence[this.playerSequence.length - 1]) {
            alert('Game Over! Level: ' + this.level);
            this.startBtn.click();
            return;
        }
        if (this.playerSequence.length === this.sequence.length) {
            setTimeout(() => this.nextRound(), 1000);
        }
    }
}
const game = new SimonGame();
