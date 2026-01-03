/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

// Snake Game

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.difficultySelect = document.getElementById('difficulty');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.snake = [{x: 200, y: 200}];
        this.food = this.generateFood();
        this.direction = {x: 10, y: 0};
        this.nextDirection = {x: 10, y: 0};
        this.score = 0;
        this.level = 1;
        this.isPaused = false;
        this.gameActive = true;
        this.gameSpeed = 100;
        this.tileSize = 20;
        
        this.loadHighScore();
        this.attachEventListeners();
        this.gameLoop();
    }

    attachEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.difficultySelect.addEventListener('change', () => this.changeDifficulty());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.restartBtn.addEventListener('click', () => this.restart());
    }

    handleKeyPress(e) {
        const key = e.key.toLowerCase();
        
        if (key === ' ') {
            e.preventDefault();
            this.togglePause();
        } else if (key === 'r') {
            this.restart();
        } else if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
            e.preventDefault();
            this.updateDirection(key);
        }
    }

    updateDirection(key) {
        const directions = {
            'arrowup': {x: 0, y: -this.tileSize},
            'arrowdown': {x: 0, y: this.tileSize},
            'arrowleft': {x: -this.tileSize, y: 0},
            'arrowright': {x: this.tileSize, y: 0},
            'w': {x: 0, y: -this.tileSize},
            's': {x: 0, y: this.tileSize},
            'a': {x: -this.tileSize, y: 0},
            'd': {x: this.tileSize, y: 0}
        };
        
        const newDir = directions[key];
        
        // Prevent reversing into itself
        if (newDir.x === -this.direction.x && newDir.y === -this.direction.y) return;
        
        this.nextDirection = newDir;
    }

    generateFood() {
        let x, y, collision;
        do {
            x = Math.floor(Math.random() * (this.canvas.width / this.tileSize)) * this.tileSize;
            y = Math.floor(Math.random() * (this.canvas.height / this.tileSize)) * this.tileSize;
            collision = this.snake.some(segment => segment.x === x && segment.y === y);
        } while (collision);
        
        return {x, y};
    }

    update() {
        if (!this.gameActive || this.isPaused) return;
        
        this.direction = this.nextDirection;
        
        const head = {...this.snake[0]};
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.canvas.width || head.y < 0 || head.y >= this.canvas.height) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.level = Math.floor(this.score / 100) + 1;
            this.food = this.generateFood();
            this.gameSpeed = Math.max(40, 100 - this.level * 5);
        } else {
            this.snake.pop();
        }
        
        this.updateDisplay();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i < this.canvas.width; i += this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
        }
        for (let i = 0; i < this.canvas.height; i += this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
        }
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                this.ctx.fillStyle = '#2ecc71';
            } else {
                this.ctx.fillStyle = '#27ae60';
            }
            this.ctx.fillRect(segment.x + 1, segment.y + 1, this.tileSize - 2, this.tileSize - 2);
        });
        
        // Draw food
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.beginPath();
        this.ctx.arc(this.food.x + this.tileSize / 2, this.food.y + this.tileSize / 2, this.tileSize / 2 - 1, 0, Math.PI * 2);
        this.ctx.fill();
    }

    gameLoop() {
        this.update();
        this.draw();
        setTimeout(() => this.gameLoop(), this.gameSpeed);
    }

    gameOver() {
        this.gameActive = false;
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalHighScore').textContent = this.highScore;
        this.gameOverScreen.classList.remove('hidden');
    }

    restart() {
        this.snake = [{x: 200, y: 200}];
        this.food = this.generateFood();
        this.direction = {x: this.tileSize, y: 0};
        this.nextDirection = {x: this.tileSize, y: 0};
        this.score = 0;
        this.level = 1;
        this.gameActive = true;
        this.isPaused = false;
        this.gameOverScreen.classList.add('hidden');
        this.pauseBtn.textContent = 'Pause';
        this.updateDisplay();
    }

    togglePause() {
        if (!this.gameActive) return;
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
    }

    changeDifficulty() {
        const difficulty = this.difficultySelect.value;
        const speeds = {slow: 150, normal: 100, fast: 60, ultra: 40};
        this.gameSpeed = speeds[difficulty];
    }

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
        }
        document.getElementById('highScore').textContent = this.highScore;
    }

    loadHighScore() {
        this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
        document.getElementById('highScore').textContent = this.highScore;
    }
}

const game = new SnakeGame();
