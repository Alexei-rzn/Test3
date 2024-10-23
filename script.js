document.getElementById('saveButton').addEventListener('click', saveResult);

function saveResult() {
    const playerName = prompt("Введите ваше имя:");
    const score = getCurrentScore(); // Функция, которая возвращает текущий счет
    const date = new Date().toLocaleDateString();

    // Сохранение результата в турнирной таблице (можно использовать fetch для отправки на сервер)
    saveToLeaderboard(playerName, score, date);

    // Обновление игры (перезапуск или сброс)
    resetGame(); // Функция для сброса игры
}

function saveToLeaderboard(name, score, date) {
    // Здесь будет логика для сохранения данных в базе данных или локально
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name, score, date });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = '';

    leaderboard.forEach(entry => {
        const row = `<tr>
                        <td>${entry.name}</td>
                        <td>${entry.score}</td>
                        <td>${entry.date}</td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

function getCurrentScore() {
    // Логика для получения текущего счета игрока
    return 2048; // Пример, замените на реальную логику
}

function resetGame() {
    // Логика для сброса игры
    // Например, сброс счетчика, очистка поля и т.д.
}
