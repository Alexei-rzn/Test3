const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Настройки подключения к MySQL
const db = mysql.createConnection({
    host: 'localhost', // укажите ваш хост
    user: 'your_username', // укажите ваше имя пользователя
    password: 'your_password', // укажите ваш пароль
    database: 'your_database' // укажите вашу БД
});

// Подключаемся к базе данных
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Middleware для разрешения CORS
app.use(cors());

// Обработчик для получения данных
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM your_table'; // Замените на вашу таблицу
    db.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
