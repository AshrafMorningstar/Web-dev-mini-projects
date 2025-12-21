// 2048 Game - Premium Edition with Particle Effects

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8 - 4,
                life: 1,
                color
            });
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.02;
            
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            return p.life > 0;
        });
        
        this.ctx.globalAlpha = 1;
        if (this.particles.length > 0) requestAnimationFrame(() => this.update());
    }
}

class Game2048Premium {
    constructor() {
        this.board = [];
        this.score = 0;
        this.gameBoard = document.getElementById('gameBoard');
        this.scoreDisplay = document.getElementById('score');
        this.highScoreDisplay = document.getElementById('highScore');
        this.bestTileDisplay = document.getElementById('bestTile');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.particles = new ParticleSystem('particleCanvas');
        
        this.highScore = parseInt(localStorage.getItem('2048HighScore')) || 0;
        this.bestTile = parseInt(localStorage.getItem('2048BestTile')) || 2;
        this.highScoreDisplay.textContent = this.highScore;
        this.bestTileDisplay.textContent = this.bestTile;
        
        this.initBoard();
        this.attachEventListeners();
    }

    initBoard() {
        this.board = Array(16).fill(0);
        this.addNewTile();
        this.addNewTile();
        this.render();
    }

    addNewTile() {
        const empty = this.board.map((val, i) => val === 0 ? i : null).filter(i => i !== null);
        if (empty.length > 0) {
            const idx = empty[Math.floor(Math.random() * empty.length)];
            this.board[idx] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    attachEventListeners() {
        document.addEventListener('keydown', (e) => {
            const keyMap = {'ArrowLeft': 'left', 'ArrowRight': 'right', 'ArrowUp': 'up', 'ArrowDown': 'down'};
            if (keyMap[e.key]) {
                e.preventDefault();
                this.move(keyMap[e.key]);
            }
        });
        this.newGameBtn.addEventListener('click', () => this.initBoard());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('2048Theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    }

    move(direction) {
        const oldBoard = [...this.board];
        this.board = this.slideAndMerge(direction);
        
        if (JSON.stringify(oldBoard) !== JSON.stringify(this.board)) {
            this.addNewTile();
            this.render();
        }
    }

    slideAndMerge(direction) {
        let board = this.board;
        if (direction === 'up' || direction === 'down') {
            board = this.transposeBoard(board);
        }
        if (direction === 'right' || direction === 'down') {
            board = this.reverseBoard(board);
        }
        
        const newBoard = [];
        for (let i = 0; i < 4; i++) {
            const row = board.slice(i * 4, (i + 1) * 4);
            const merged = this.mergeRow(row);
            newBoard.push(...merged);
        }
        
        if (direction === 'right' || direction === 'down') {
            newBoard = this.reverseBoard(newBoard);
        }
        if (direction === 'up' || direction === 'down') {
            newBoard = this.transposeBoard(newBoard);
        }
        
        return newBoard;
    }

    mergeRow(row) {
        row = row.filter(v => v !== 0);
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                this.score += row[i];
                if (row[i] > this.bestTile) {
                    this.bestTile = row[i];
                    localStorage.setItem('2048BestTile', this.bestTile);
                }
                row.splice(i + 1, 1);
            }
        }
        while (row.length < 4) row.push(0);
        return row;
    }

    transposeBoard(board) {
        const newBoard = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                newBoard.push(board[j * 4 + i]);
            }
        }
        return newBoard;
    }

    reverseBoard(board) {
        const newBoard = [];
        for (let i = 0; i < 4; i++) {
            const row = board.slice(i * 4, (i + 1) * 4).reverse();
            newBoard.push(...row);
        }
        return newBoard;
    }

    render() {
        this.gameBoard.innerHTML = '';
        this.scoreDisplay.textContent = this.score;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('2048HighScore', this.highScore);
            this.highScoreDisplay.textContent = this.highScore;
        }
        this.bestTileDisplay.textContent = this.bestTile;
        
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            const value = this.board[i];
            if (value !== 0) {
                tile.setAttribute('data-value', value);
                tile.textContent = value;
            }
            this.gameBoard.appendChild(tile);
        }
    }
}

const game = new Game2048Premium();
