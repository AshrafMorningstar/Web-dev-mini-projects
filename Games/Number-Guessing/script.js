class NumberGuessingGame {
    constructor() {
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.submitBtn = document.getElementById('submitBtn');
        this.guessInput = document.getElementById('guessInput');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.submitBtn.addEventListener('click', () => this.checkGuess());
        this.newGameBtn.addEventListener('click', () => this.reset());
        this.guessInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.checkGuess(); });
    }
    checkGuess() {
        const guess = parseInt(this.guessInput.value);
        if (isNaN(guess) || guess < 1 || guess > 100) { alert('Please enter a valid number!'); return; }
        this.attempts++;
        const result = document.getElementById('result');
        const hint = document.getElementById('hint');
        document.getElementById('attempts').textContent = this.attempts;
        if (guess === this.secretNumber) {
            result.innerHTML = '🎉 You got it! The number was ' + this.secretNumber;
            result.className = 'result correct';
            this.submitBtn.disabled = true;
            this.guessInput.disabled = true;
        } else if (guess < this.secretNumber) {
            result.textContent = '📈 Too low!';
            result.className = 'result incorrect';
            hint.textContent = 'The number is higher than ' + guess;
        } else {
            result.textContent = '📉 Too high!';
            result.className = 'result incorrect';
            hint.textContent = 'The number is lower than ' + guess;
        }
        this.guessInput.value = '';
    }
    reset() {
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.guessInput.value = '';
        document.getElementById('attempts').textContent = '0';
        document.getElementById('result').innerHTML = '';
        document.getElementById('hint').textContent = '';
        this.submitBtn.disabled = false;
        this.guessInput.disabled = false;
        this.guessInput.focus();
    }
}
const game = new NumberGuessingGame();
