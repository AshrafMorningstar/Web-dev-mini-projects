/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

// 2048 Game Logic

class Game2048 {
    constructor() {
        this.board = [];
        this.score = 0;
        this.gameBoard = document.getElementById('gameBoard');
        this.scoreDisplay = document.getElementById('score');
        this.highScoreDisplay = document.getElementById('highScore');
        this.highScore = localStorage.getItem('highScore2048') || 0;
        this.highScoreDisplay.textContent = this.highScore;
        
        this.initBoard();
        this.attachEventListeners();
    }

    initBoard() {
        // Initialize empty 4x4 board
        this.board = Array(4).fill(null).map(() => Array(4).fill(0));
        this.addNewTile();
        this.addNewTile();
        this.render();
    }

    addNewTile() {
        const empty = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === 0) {
                    empty.push({ i, j });
                }
            }
        }
        
        if (empty.length > 0) {
            const { i, j } = empty[Math.floor(Math.random() * empty.length)];
            this.board[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        let moved = false;
        const oldBoard = this.board.map(row => [...row]);

        if (direction === 'left' || direction === 'right') {
            this.board = this.board.map(row => this.slideAndMerge(row, direction === 'right'));
        } else {
            this.board = this.rotateBoard(direction === 'up' ? 'clockwise' : 'counterclockwise');
            this.board = this.board.map(row => this.slideAndMerge(row));
            this.board = this.rotateBoard(direction === 'up' ? 'counterclockwise' : 'clockwise');
        }

        // Check if board changed
        moved = JSON.stringify(oldBoard) !== JSON.stringify(this.board);
        
        if (moved) {
            this.addNewTile();
            this.render();
            
            if (this.isGameOver()) {
                setTimeout(() => alert('Game Over!'), 100);
            }
        }
    }

    slideAndMerge(row, reverse = false) {
        if (reverse) row = row.reverse();
        
        // Slide
        row = row.filter(val => val !== 0);
        
        // Merge
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                this.score += row[i];
                row.splice(i + 1, 1);
            }
        }
        
        // Fill with zeros
        while (row.length < 4) {
            row.push(0);
        }
        
        if (reverse) row = row.reverse();
        return row;
    }

    rotateBoard(direction) {
        const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (direction === 'clockwise') {
                    newBoard[j][3 - i] = this.board[i][j];
                } else {
                    newBoard[3 - j][i] = this.board[i][j];
                }
            }
        }
        return newBoard;
    }

    isGameOver() {
        // Check if any moves possible
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] === 0) return false;
                if (j < 3 && this.board[i][j] === this.board[i][j + 1]) return false;
                if (i < 3 && this.board[i][j] === this.board[i + 1][j]) return false;
            }
        }
        return true;
    }

    render() {
        this.gameBoard.innerHTML = '';
        this.scoreDisplay.textContent = this.score;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore2048', this.highScore);
            this.highScoreDisplay.textContent = this.highScore;
        }
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const value = this.board[i][j];
                const tile = document.createElement('div');
                tile.className = 'tile';
                if (value !== 0) {
                    tile.setAttribute('data-value', value);
                    tile.textContent = value;
                }
                this.gameBoard.appendChild(tile);
            }
        }
    }

    reset() {
        this.score = 0;
        this.initBoard();
    }

    attachEventListeners() {
        document.addEventListener('keydown', (e) => {
            const keyMap = {
                'ArrowLeft': 'left',
                'ArrowRight': 'right',
                'ArrowUp': 'up',
                'ArrowDown': 'down'
            };
            if (keyMap[e.key]) {
                e.preventDefault();
                this.move(keyMap[e.key]);
            }
        });
        
        document.getElementById('newGameBtn').addEventListener('click', () => this.reset());
    }
}

// Initialize game
const game = new Game2048();
