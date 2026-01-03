/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

class AgeCalculator {
    constructor() {
        this.birthDateInput = document.getElementById('birthDate');
        this.result = document.getElementById('result');
        this.birthDateInput.addEventListener('change', () => this.calculateAge());
    }
    calculateAge() {
        const birthDate = new Date(this.birthDateInput.value);
        if (isNaN(birthDate)) return;
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        if (days < 0) { months--; const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += prevMonth.getDate(); }
        if (months < 0) { years--; months += 12; }
        const zodiac = this.getZodiac(birthDate.getMonth() + 1, birthDate.getDate());
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('zodiac').textContent = zodiac;
        this.result.classList.remove('hidden');
    }
    getZodiac(month, day) {
        const zodiacs = [
            { name: '♈ Aries', start: [3, 21], end: [4, 19] },
            { name: '♉ Taurus', start: [4, 20], end: [5, 20] },
            { name: '♊ Gemini', start: [5, 21], end: [6, 20] },
            { name: '♋ Cancer', start: [6, 21], end: [7, 22] },
            { name: '♌ Leo', start: [7, 23], end: [8, 22] },
            { name: '♍ Virgo', start: [8, 23], end: [9, 22] },
            { name: '♎ Libra', start: [9, 23], end: [10, 22] },
            { name: '♏ Scorpio', start: [10, 23], end: [11, 21] },
            { name: '♐ Sagittarius', start: [11, 22], end: [12, 21] },
            { name: '♑ Capricorn', start: [12, 22], end: [1, 19] },
            { name: '♒ Aquarius', start: [1, 20], end: [2, 18] },
            { name: '♓ Pisces', start: [2, 19], end: [3, 20] }
        ];
        for (let z of zodiacs) {
            if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) {
                return z.name;
            }
        }
        return 'Unknown';
    }
}
const ageCalculator = new AgeCalculator();
