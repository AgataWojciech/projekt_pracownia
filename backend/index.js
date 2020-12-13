const express = require('express');
const proxy = require('express-http-proxy');

// ustaw zmienne z pliku .env
require('dotenv').config();

const database = require('./database.js');
const users = require('./routes/users.js');

// stwórz serwer
const app = express();

// wymuszaj by dane przesyłane do serwera
// były w formacie MIME application/json
app.use(express.json());

// obsłuż wszystko co się zaczyna od /api/users
// przez router users
app.use('/api/users', users);

// wszystkie inne żądania przekazuj do serwera Vue
app.use('/', proxy('localhost:8080'));

// po połączeniu się z bazą danych zacznij słuchać żądań HTTP
database.connect().then(function () {
    app.listen(process.env.Api_Port, function () {
        console.log("Listening at http://localhost:" + process.env.Api_Port);
    });
});
