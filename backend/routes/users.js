const express = require('express');
const { Users } = require('../database.js');

const router = express.Router();

const fieldsReturned = ['id', 'name', 'surname', 'login', 'dateOfBirth', 'isDeleted']

router.get('/', async function (request, response) {
    // zwróć tylko pola jakie potrzebujemy zwrócić
    // (zdefiniowane w tablicy fieldsReturned)

    const allUsers = []

    // zwróć wszystkich użytkowników jakich otrzymaliśmy z bazy
    for (const user of await Users.findAll()) {
        const data = user.toJSON()
        
        // stwórz nowy obiekt na podstawie danych otrzymanych z bazy
        const result = {}
        for (const field of fieldsReturned) {
            result[field] = data[field];
        }
        allUsers.push(result);
    }
    response.json(allUsers);
});


router.post('/', async function (request, response) {
    // pola jakie są wymagane do stworzenia użytkownika
    const required = ['name', 'surname', 'password', 'dateOfBirth', 'login'];

    // sprawdź czy są wszystkie pożądane pola
    for (const requiredFieldName of required) {
        // jeśli nie ma zwróć błąd
        if (!request.body.hasOwnProperty(requiredFieldName)) {
            response.status(400).json({
                message: 'Expected field "' + requiredFieldName + '"'
            });
            return;
        }
    }

    // jeśli jesteśmy tutaj to mozemy bezpiecznie tworzyć użytkownika
    const newUser = await Users.create(request.body)
    
    // zwracamy dane nowego użytkownika, takie jakie chcemy ujawnić
    const data = newUser.toJSON()
    const result = {}
    for (const field of fieldsReturned)
        result[field] = data[field];
    response.json(result);
});

module.exports = router;
