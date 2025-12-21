class DiceGame {
    constructor() {
        this.scores = [0, 0];
        this.current = 0;
        this.activePlayer = 0;
        this.playing = true;
        document.getElementById('rollBtn').addEventListener('click', () => this.roll());
        document.getElementById('holdBtn').addEventListener('click', () => this.hold());
        document.getElementById('newBtn').addEventListener('click', () => this.reset());
    }
    roll() {
        if (!this.playing) return;
        const dice = Math.floor(Math.random() * 6) + 1;
        if (dice !== 1) {
            this.current += dice;
        } else {
            this.current = 0;
            this.activePlayer = this.activePlayer === 0 ? 1 : 0;
        }
        this.update();
    }
    hold() {
        if (!this.playing) return;
        this.scores[this.activePlayer] += this.current;
        this.current = 0;
        if (this.scores[this.activePlayer] >= 100) {
            this.playing = false;
            alert('Player ' + (this.activePlayer + 1) + ' wins!');
        }
        this.activePlayer = this.activePlayer === 0 ? 1 : 0;
        this.update();
    }
    update() {
        document.getElementById('score0').textContent = this.scores[0];
        document.getElementById('score1').textContent = this.scores[1];
        document.getElementById('current' + this.activePlayer).textContent = this.current;
        document.getElementById('current' + (1 - this.activePlayer)).textContent = 0;
    }
    reset() {
        this.scores = [0, 0];
        this.current = 0;
        this.activePlayer = 0;
        this.playing = true;
        this.update();
    }
}
const game = new DiceGame();
