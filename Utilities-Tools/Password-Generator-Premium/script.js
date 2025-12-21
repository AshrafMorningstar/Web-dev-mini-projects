class CodeRainAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        // Simple animation placeholder
        requestAnimationFrame(() => this.animate());
    }
}

class PasswordGeneratorPremium {
    constructor() {
        this.codeRain = new CodeRainAnimation('rainCanvas');
        this.lengthRange = document.getElementById('lengthRange');
        this.lengthDisplay = document.getElementById('lengthDisplay');
        this.displayLength = document.getElementById('displayLength');
        this.passwordDisplay = document.getElementById('passwordDisplay');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.strengthBar = document.getElementById('strengthBar');
        this.strengthValue = document.getElementById('strengthValue');
        this.entropyValue = document.getElementById('entropyValue');
        this.crackTime = document.getElementById('crackTime');
        this.statusMessage = document.getElementById('statusMessage');
        
        this.chars = {
            upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lower: 'abcdefghijklmnopqrstuvwxyz',
            num: '0123456789',
            special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        
        this.attachEvents();
        this.generate();
    }

    attachEvents() {
        this.lengthRange.addEventListener('input', () => {
            this.lengthDisplay.textContent = this.lengthRange.value;
            this.displayLength.textContent = this.lengthRange.value;
            this.generate();
        });
        
        ['uppercase', 'lowercase', 'numbers', 'special'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => this.generate());
        });
        
        this.generateBtn.addEventListener('click', () => this.generate());
        this.copyBtn.addEventListener('click', () => this.copy());
        this.shareBtn.addEventListener('click', () => this.share());
        this.passwordDisplay.addEventListener('click', () => this.copy());
    }

    generate() {
        let chars = '';
        if (document.getElementById('uppercase').checked) chars += this.chars.upper;
        if (document.getElementById('lowercase').checked) chars += this.chars.lower;
        if (document.getElementById('numbers').checked) chars += this.chars.num;
        if (document.getElementById('special').checked) chars += this.chars.special;
        
        if (!chars) {
            this.passwordDisplay.textContent = '>> NO CHARACTER SET SELECTED';
            return;
        }
        
        const len = parseInt(this.lengthRange.value);
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        this.passwordDisplay.textContent = pwd;
        this.updateStrength(pwd, chars.length);
        this.statusMessage.textContent = '  PASSWORD GENERATED SUCCESSFULLY';
    }

    updateStrength(pwd, charsetSize) {
        const entropy = pwd.length * Math.log2(charsetSize);
        let strength = 'WEAK';
        let percent = 25;
        
        if (entropy >= 60) { strength = 'MEDIUM'; percent = 50; }
        if (entropy >= 100) { strength = 'STRONG'; percent = 75; }
        if (entropy >= 150) { strength = 'VERY STRONG'; percent = 100; }
        
        this.strengthBar.style.width = percent + '%';
        this.strengthValue.textContent = strength;
        this.entropyValue.textContent = Math.floor(entropy);
        
        const crackSeconds = Math.pow(2, entropy) / 1e9;
        this.crackTime.textContent = this.formatTime(crackSeconds);
    }

    formatTime(seconds) {
        if (seconds < 1) return 'INSTANT';
        if (seconds < 60) return Math.floor(seconds) + 's';
        if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
        if (seconds < 86400) return Math.floor(seconds / 3600) + 'h';
        if (seconds < 31536000) return Math.floor(seconds / 86400) + 'd';
        return Math.floor(seconds / 31536000) + 'y';
    }

    copy() {
        const pwd = this.passwordDisplay.textContent;
        if (pwd.startsWith('>>')) return;
        navigator.clipboard.writeText(pwd);
        this.statusMessage.textContent = '  PASSWORD COPIED TO CLIPBOARD';
        setTimeout(() => {
            this.statusMessage.textContent = '  READY';
        }, 3000);
    }

    share() {
        const pwd = this.passwordDisplay.textContent;
        if (pwd.startsWith('>>')) return;
        if (navigator.share) {
            navigator.share({
                title: 'Secure Password',
                text: pwd
            });
        }
    }
}

const gen = new PasswordGeneratorPremium();
