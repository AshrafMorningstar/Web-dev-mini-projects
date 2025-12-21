class BMICalculatorPremium {
    constructor() {
        this.heightInput = document.getElementById('height');
        this.weightInput = document.getElementById('weight');
        this.heightUnit = document.getElementById('heightUnit');
        this.weightUnit = document.getElementById('weightUnit');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resultSection = document.getElementById('result');
        
        this.calculateBtn.addEventListener('click', () => this.calculate());
        [this.heightInput, this.weightInput].forEach(el => {
            el.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.calculate();
            });
        });
    }

    calculate() {
        const height = parseFloat(this.heightInput.value);
        const weight = parseFloat(this.weightInput.value);
        
        if (!height || !weight || height <= 0 || weight <= 0) {
            alert('Please enter valid values');
            return;
        }
        
        let heightM = this.heightUnit.value === 'cm' ? height / 100 : height * 0.3048;
        let weightKg = this.weightUnit.value === 'kg' ? weight : weight * 0.453592;
        
        const bmi = weightKg / (heightM * heightM);
        this.displayResult(bmi, height, weight);
    }

    displayResult(bmi, height, weight) {
        const result = this.getCategory(bmi);
        
        document.getElementById('bmiValue').textContent = bmi.toFixed(1);
        document.getElementById('statusEmoji').textContent = result.emoji;
        document.getElementById('statusText').textContent = result.category;
        
        const healthyMin = 18.5 * (height / 100) ** 2;
        const healthyMax = 24.9 * (height / 100) ** 2;
        document.getElementById('healthyRange').textContent = `${healthyMin.toFixed(1)} - ${healthyMax.toFixed(1)} kg`;
        
        const recommendations = this.getRecommendations(bmi);
        const list = document.getElementById('recommendationsList');
        list.innerHTML = '';
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            list.appendChild(li);
        });
        
        this.updateRing(bmi);
        this.resultSection.classList.remove('hidden');
    }

    getCategory(bmi) {
        if (bmi < 18.5) return { category: 'Underweight', emoji: '🪶' };
        if (bmi < 25) return { category: 'Healthy Weight', emoji: '🌟' };
        if (bmi < 30) return { category: 'Overweight', emoji: '🤔' };
        return { category: 'Obese', emoji: '⚠️' };
    }

    getRecommendations(bmi) {
        if (bmi < 18.5) return ['Eat nutrient-dense foods', 'Increase calorie intake', 'Consult a dietitian'];
        if (bmi < 25) return ['Maintain current lifestyle', 'Regular exercise', 'Balanced diet'];
        if (bmi < 30) return ['Increase physical activity', 'Reduce calorie intake', 'Walk 30 mins daily'];
        return ['Consult healthcare provider', 'Start exercising gradually', 'Reduce sugar intake'];
    }

    updateRing(bmi) {
        const ring = document.getElementById('bmiRing');
        let percentage = (bmi - 15) / 30;
        percentage = Math.max(0, Math.min(1, percentage));
        ring.style.strokeDashoffset = 283 * (1 - percentage);
    }
}

const bmiCalc = new BMICalculatorPremium();
