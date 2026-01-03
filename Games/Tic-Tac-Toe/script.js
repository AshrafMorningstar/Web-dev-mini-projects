/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

// Tic-Tac-Toe Game

class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.difficulty = 'hard';
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
        this.gameOver = false;
        
        this.gameBoard = document.getElementById('gameBoard');
        this.message = document.getElementById('message');
        this.difficultySelect = document.getElementById('difficulty');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.loadStats();
        this.renderBoard();
        this.attachEventListeners();
    }

    renderBoard() {
        this.gameBoard.innerHTML = '';
        this.board.forEach((cell, index) => {
            const cellEl = document.createElement('button');
            cellEl.className = 'cell';
            cellEl.textContent = cell;
            if (cell) cellEl.setAttribute('data-player', cell);
            cellEl.disabled = cell !== '' || this.gameOver;
            cellEl.addEventListener('click', () => this.playerMove(index));
            this.gameBoard.appendChild(cellEl);
        });
    }

    playerMove(index) {
        if (this.board[index] === '' && !this.gameOver) {
            this.board[index] = 'X';
            if (this.checkWin('X')) {
                this.message.textContent = '🎉 You won!';
                this.wins++;
                this.gameOver = true;
                this.saveStats();
            } else if (this.isBoardFull()) {
                this.message.textContent = "It's a draw!";
                this.draws++;
                this.gameOver = true;
                this.saveStats();
            } else {
                this.aiMove();
            }
            this.renderBoard();
        }
    }

    aiMove() {
        const emptySpaces = this.board.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
        
        if (emptySpaces.length === 0) return;
        
        let moveIndex;
        
        if (this.difficulty === 'easy') {
            moveIndex = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        } else {
            // Hard: Use minimax algorithm
            moveIndex = this.minimax(this.board, 'O').index;
        }
        
        this.board[moveIndex] = 'O';
        
        if (this.checkWin('O')) {
            this.message.textContent = '😢 AI won!';
            this.losses++;
            this.gameOver = true;
            this.saveStats();
        } else if (this.isBoardFull()) {
            this.message.textContent = "It's a draw!";
            this.draws++;
            this.gameOver = true;
            this.saveStats();
        }
    }

    minimax(board, player) {
        const emptySpaces = board.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
        
        if (this.checkWin(board, 'O')) return { score: 10 };
        if (this.checkWin(board, 'X')) return { score: -10 };
        if (emptySpaces.length === 0) return { score: 0 };
        
        let bestScore = player === 'O' ? -Infinity : Infinity;
        let bestIndex;
        
        emptySpaces.forEach(index => {
            board[index] = player;
            const result = this.minimax(board, player === 'O' ? 'X' : 'O');
            board[index] = '';
            
            if (player === 'O') {
                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestIndex = index;
                }
            } else {
                if (result.score < bestScore) {
                    bestScore = result.score;
                    bestIndex = index;
                }
            }
        });
        
        return { index: bestIndex, score: bestScore };
    }

    checkWin(board, player) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        return winCombos.some(combo => 
            combo.every(index => board[index] === player)
        );
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.message.textContent = '';
        this.renderBoard();
    }

    saveStats() {
        localStorage.setItem('tictactoe-wins', this.wins);
        localStorage.setItem('tictactoe-losses', this.losses);
        localStorage.setItem('tictactoe-draws', this.draws);
        this.updateDisplay();
    }

    loadStats() {
        this.wins = parseInt(localStorage.getItem('tictactoe-wins')) || 0;
        this.losses = parseInt(localStorage.getItem('tictactoe-losses')) || 0;
        this.draws = parseInt(localStorage.getItem('tictactoe-draws')) || 0;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('wins').textContent = this.wins;
        document.getElementById('losses').textContent = this.losses;
        document.getElementById('draws').textContent = this.draws;
    }

    attachEventListeners() {
        this.difficultySelect.addEventListener('change', (e) => {
            this.difficulty = e.target.value;
        });
        
        this.resetBtn.addEventListener('click', () => this.resetGame());
    }
}

const game = new TicTacToe();
