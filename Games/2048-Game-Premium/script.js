/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

class Game2048 {
    constructor() {
        this.board = Array(16).fill(0);
        this.score = 0;
        this.best = localStorage.getItem('2048-best') || 0;
        this.boardEl = document.getElementById('gameBoard');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.init();
    }

    init() {
        this.addTile();
        this.addTile();
        this.render();
        document.addEventListener('keydown', e => this.handleKeyPress(e));
    }

    newGame() {
        this.board = Array(16).fill(0);
        this.score = 0;
        this.addTile();
        this.addTile();
        this.render();
    }

    addTile() {
        const empty = this.board.map((v, i) => v === 0 ? i : -1).filter(i => i !== -1);
        if (empty.length > 0) {
            const randomIndex = empty[Math.floor(Math.random() * empty.length)];
            this.board[randomIndex] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    render() {
        this.boardEl.innerHTML = '';
        this.board.forEach(value => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            if (value > 0) {
                tile.textContent = value;
                tile.style.background = `hsl(${Math.log2(value) * 30}, 80%, 50%)`;
            }
            this.boardEl.appendChild(tile);
        });
        document.getElementById('score').textContent = this.score;
        document.getElementById('best').textContent = this.best;
    }

    handleKeyPress(e) {
        const directions = { ArrowUp: 0, ArrowDown: 1, ArrowLeft: 2, ArrowRight: 3 };
        if (e.key in directions) {
            e.preventDefault();
            this.move(directions[e.key]);
        }
    }

    move(direction) {
        // Simplified move logic
        this.addTile();
        this.render();
    }
}

const game = new Game2048();
