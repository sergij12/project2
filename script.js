const apiKey = 'e6c53112560f1f6bfd39d2c372168ebe';

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;

    if (!city) {
        document.getElementById('error').innerText = "Введіть назву міста!";
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Помилка: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('error').innerText = '';
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('error').innerText = error.message;
            clearWeatherInfo();
        });
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = `Температура: ${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = `Погода: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Вологість: ${data.main.humidity}%`;
    document.getElementById('wind').innerText = `Вітер: ${data.wind.speed} м/с`;
}

function clearWeatherInfo() {
    document.getElementById('cityName').innerText = '';
    document.getElementById('temperature').innerText = '';
    document.getElementById('description').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('wind').innerText = '';
}