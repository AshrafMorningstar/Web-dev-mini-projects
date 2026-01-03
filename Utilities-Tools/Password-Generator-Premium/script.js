/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 16; i++) password += chars.charAt(Math.floor(Math.random() * chars.length));
    document.getElementById('passwordDisplay').textContent = password;
}

function copyPassword() {
    const pwd = document.getElementById('passwordDisplay').textContent;
    navigator.clipboard.writeText(pwd);
    alert('Copied!');
}

generatPassword();
