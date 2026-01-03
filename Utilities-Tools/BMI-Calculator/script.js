/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

// BMI Calculator

class BMICalculator {
    constructor() {
        this.form = document.getElementById('bmiForm');
        this.result = document.getElementById('result');
        
        this.form.addEventListener('submit', (e) => this.calculateBMI(e));
    }

    calculateBMI(e) {
        e.preventDefault();
        
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const heightUnit = document.getElementById('heightUnit').value;
        const weightUnit = document.getElementById('weightUnit').value;
        
        // Convert to metric
        let heightM = heightUnit === 'cm' ? height / 100 : height * 0.3048;
        let weightKg = weightUnit === 'kg' ? weight : weight * 0.453592;
        
        // Calculate BMI
        const bmi = weightKg / (heightM * heightM);
        
        this.displayResult(bmi);
    }

    getCategory(bmi) {
        if (bmi < 18.5) return { category: 'Underweight', class: 'underweight' };
        if (bmi < 25) return { category: 'Normal Weight', class: 'normal' };
        if (bmi < 30) return { category: 'Overweight', class: 'overweight' };
        return { category: 'Obese', class: 'obese' };
    }

    displayResult(bmi) {
        const { category, class: className } = this.getCategory(bmi);
        
        document.getElementById('bmiValue').textContent = bmi.toFixed(1);
        const categoryEl = document.getElementById('bmiCategory');
        categoryEl.textContent = category;
        categoryEl.className = `bmi-category ${className}`;
        
        this.result.classList.remove('hidden');
    }
}

const calculator = new BMICalculator();
