/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

class PasswordGenerator {
    constructor() {
        this.lengthInput = document.getElementById('length');
        this.lengthValue = document.getElementById('lengthValue');
        this.generateBtn = document.getElementById('generateBtn');
        this.passwordDisplay = document.getElementById('passwordDisplay');
        this.copyBtn = document.getElementById('copyBtn');
        this.strengthBar = document.getElementById('strengthBar');
        this.strengthText = document.getElementById('strengthText');
        this.chars = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', num: '0123456789', special: '!@#$%^&*()' };
        this.lengthInput.addEventListener('input', () => { this.lengthValue.textContent = this.lengthInput.value; this.generate(); });
        document.getElementById('uppercase').addEventListener('change', () => this.generate());
        document.getElementById('lowercase').addEventListener('change', () => this.generate());
        document.getElementById('numbers').addEventListener('change', () => this.generate());
        document.getElementById('special').addEventListener('change', () => this.generate());
        this.generateBtn.addEventListener('click', () => this.generate());
        this.copyBtn.addEventListener('click', () => this.copy());
        this.generate();
    }
    generate() {
        let chars = '';
        if (document.getElementById('uppercase').checked) chars += this.chars.upper;
        if (document.getElementById('lowercase').checked) chars += this.chars.lower;
        if (document.getElementById('numbers').checked) chars += this.chars.num;
        if (document.getElementById('special').checked) chars += this.chars.special;
        if (!chars) { this.passwordDisplay.value = ''; return; }
        const len = parseInt(this.lengthInput.value);
        let pwd = '';
        for (let i = 0; i < len; i++) pwd += chars.charAt(Math.floor(Math.random() * chars.length));
        this.passwordDisplay.value = pwd;
        this.updateStrength(pwd);
    }
    updateStrength(pwd) {
        let entropy = 0;
        if (/[a-z]/.test(pwd)) entropy += 26;
        if (/[A-Z]/.test(pwd)) entropy += 26;
        if (/[0-9]/.test(pwd)) entropy += 10;
        if (/[^a-zA-Z0-9]/.test(pwd)) entropy += 32;
        const score = pwd.length * Math.log2(entropy);
        let strength = 'weak';
        let text = 'Weak';
        if (score >= 60) { strength = 'medium'; text = 'Medium'; }
        if (score >= 90) { strength = 'strong'; text = 'Strong'; }
        if (score >= 120) { strength = 'very-strong'; text = 'Very Strong'; }
        this.strengthBar.className = 'strength-bar ' + strength;
        this.strengthText.textContent = 'Strength: ' + text;
    }
    copy() {
        navigator.clipboard.writeText(this.passwordDisplay.value);
        this.copyBtn.textContent = '✓';
        setTimeout(() => { this.copyBtn.textContent = '📋'; }, 2000);
    }
}
const gen = new PasswordGenerator();
