<template>
    <v-card>
        <v-card-title>
            Użytkownicy
            <v-spacer></v-spacer>
            <v-btn @click="addMockUser()">Dodaj</v-btn>
            <v-btn @click="downloadUsers()">Odśwież</v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="users"
        ></v-data-table>
    </v-card>
</template>
<script>
import axios from 'axios';
import MockData from './MOCK_DATA';

export default {
    data() {
        // powiązanie nagłówków z nazwami wartości w tablicy users do tabeli
        const headers = [
            { text: 'ID', value: 'id' },
            { text: 'Login', value: 'login' },
            { text: 'Imię', value: 'name' },
            { text: 'Nazwisko', value: 'surname' },
            { text: 'Data urodzenia', value: 'dateOfBirth' },
            { text: 'Usunięty', value: 'isDeleted' }
        ]

        return {
            users: [],
            headers: headers,
            index: 0
        }
    },

    async mounted() {
        // w momencie jak komponent pojawi się na stronie pobierz użytkowników
        await this.downloadUsers()
    },

    methods: {
        async downloadUsers() {
            // pobierz dane o użytkownikach
            const users = await axios.get('/api/users');
            if (users.status == 200 && users.data) {
                // jeśli dostaliśmy dane to je wyświetl
                this.users = users.data;
            }
        },

        async addMockUser() {
            // weź kolejnego przykładowego użytkownika
            const nextUser = MockData[this.index++];

            // dodaj go do bazy danych
            const result = await axios.post('/api/users', nextUser)
            if (result.status == 200) {
                // jeśli dodano pomyślnie to dodaj go do tabeli użytkowników
                this.users.push(result.data)
            }
        }
    }
};
</script>