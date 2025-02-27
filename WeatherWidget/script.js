const API_KEY = 'your-api-key';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    getWeatherBtn.addEventListener('click', fetchWeatherData);
    themeToggleBtn.addEventListener('click', toggleTheme);
});

function fetchWeatherData() {
    const locationInput = document.getElementById('locationInput').value.trim();
    clearError();

    if (!locationInput) {
        displayError('Введите название города или координаты.');
        return;
    }

    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(locationInput)}&lang=ru`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                updateUI(response);
            } catch (error) {
                displayError('Ошибка обработки данных ответа.');
            }
        } else {
            displayError('Ошибка при загрузке данных. Проверьте правильность ввода.');
        }
    };

    xhr.onerror = function() {
        displayError('Ошибка сети. Попробуйте снова.');
    };

    xhr.send();
}

function updateUI(data) {
    const widget = document.getElementById('weatherWidget');
    const cityNameElem = document.getElementById('cityName');
    const temperatureElem = document.getElementById('temperature');
    const humidityElem = document.getElementById('humidity');
    const weatherIconElem = document.getElementById('weatherIcon');

    cityNameElem.textContent = data.location.name;
    temperatureElem.textContent = `Температура: ${data.current.temp_c} °C`;
    humidityElem.textContent = `Влажность: ${data.current.humidity} %`;

    weatherIconElem.src = data.current.condition.icon;
    weatherIconElem.alt = data.current.condition.text;

    widget.classList.remove('hidden');
    widget.style.opacity = 0;
    widget.style.transform = 'translateY(20px)';
    setTimeout(() => {
        widget.style.animation = '';
    }, 10);
}

function toggleTheme() {
    const themeLink = document.getElementById('themeStylesheet');
    const currentTheme = themeLink.getAttribute('href');

    if (currentTheme === 'theme-light.css') {
        themeLink.setAttribute('href', 'theme-dark.css');
    } else {
        themeLink.setAttribute('href', 'theme-light.css');
    }
}

function displayError(message) {
    document.getElementById('errorMessage').textContent = message;
}

function clearError() {
    document.getElementById('errorMessage').textContent = '';
}
