const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize({
    dialect: 'mariadb',
    database: process.env.Database,
    username: process.env.DatabaseUsername,
    password: process.env.DatabasePassword,
    host: process.env.DatabaseHost,
    port: process.env.DatabasePort
});

// funkcja wykonująca połączenie z bazą danych
async function connect() {
    try {
        // zaloguj się
        await database.authenticate();
        console.log('Successfull connection to database!');

        // utwórz tabele wg definicji oraz usuń poprzednie
        await database.sync({ force: true })
        console.log('Successfull model synchronisation!')
    } catch (err) {
        // wypisz błąd i zakończ program

        console.error(err);
        process.exit();
    }
}

// definicja tabeli
const Users = database.define('Users', {
    id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATEONLY, allowNull: false },
    login: { type: DataTypes.STRING, allowNull: false },
    isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
})

module.exports = { Users, database, connect };
