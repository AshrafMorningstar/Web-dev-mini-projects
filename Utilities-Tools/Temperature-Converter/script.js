/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

// Temperature Converter

class TemperatureConverter {
    constructor() {
        this.celsiusInput = document.getElementById('celsius');
        this.fahrenheitInput = document.getElementById('fahrenheit');
        this.kelvinInput = document.getElementById('kelvin');
        this.presetButtons = document.querySelectorAll('.preset-btn');
        this.clearBtn = document.querySelector('.btn-clear');
        
        this.celsiusInput.addEventListener('input', () => this.convertFromCelsius());
        this.fahrenheitInput.addEventListener('input', () => this.convertFromFahrenheit());
        this.kelvinInput.addEventListener('input', () => this.convertFromKelvin());
        
        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const celsius = parseFloat(btn.dataset.celsius);
                this.celsiusInput.value = celsius;
                this.convertFromCelsius();
            });
        });
        
        this.clearBtn.addEventListener('click', () => this.clear());
    }

    convertFromCelsius() {
        const celsius = parseFloat(this.celsiusInput.value) || 0;
        const fahrenheit = (celsius * 9/5) + 32;
        const kelvin = celsius + 273.15;
        
        this.fahrenheitInput.value = fahrenheit.toFixed(2);
        this.kelvinInput.value = kelvin.toFixed(2);
    }

    convertFromFahrenheit() {
        const fahrenheit = parseFloat(this.fahrenheitInput.value) || 0;
        const celsius = (fahrenheit - 32) * 5/9;
        const kelvin = celsius + 273.15;
        
        this.celsiusInput.value = celsius.toFixed(2);
        this.kelvinInput.value = kelvin.toFixed(2);
    }

    convertFromKelvin() {
        const kelvin = parseFloat(this.kelvinInput.value) || 0;
        const celsius = kelvin - 273.15;
        const fahrenheit = (celsius * 9/5) + 32;
        
        this.celsiusInput.value = celsius.toFixed(2);
        this.fahrenheitInput.value = fahrenheit.toFixed(2);
    }

    clear() {
        this.celsiusInput.value = '';
        this.fahrenheitInput.value = '';
        this.kelvinInput.value = '';
        this.celsiusInput.focus();
    }
}

const converter = new TemperatureConverter();
