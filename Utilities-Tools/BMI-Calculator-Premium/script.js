function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    if (!height || !weight) return alert('Enter valid values');
    const bmi = (weight / ((height/100) ** 2)).toFixed(1);
    document.getElementById('bmiValue').textContent = `BMI: ${bmi}`;
    document.getElementById('status').textContent = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : 'Overweight';
    document.getElementById('result').classList.remove('hidden');
}
