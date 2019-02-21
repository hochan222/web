<template>
    <v-container>
        <v-btn @click="headerSend">헤더전송</v-btn>
        <v-btn @click="IsWrite">IsWrite</v-btn>
        <v-btn @click="IsRead">IsRead</v-btn>
        <v-btn @click="IsRemove">IsRemove</v-btn>
        <v-btn @click="IsClear">IsClear</v-btn>
        <v-btn @click="apiWithToken">apiWithToken</v-btn>
        <v-btn @click="apiWithTrash">apiWithTrash</v-btn>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    mounted () {
        console.log(localStorage);
    },
    methods: {
        headerSend () {
            axios.get(`${this.$apiRootPath}test`,{ headers: { Authorization: '123' } })
                 .then(r => console.log(r))
                 .catch(e => console.log(e))
        },
        IsWrite () {
            localStorage.setItem('token', 1234);
        },
        IsRead () {
            console.log(localStorage.getItem('token'));
        },
        IsRemove () {
            localStorage.removeItem('token');
        },
        IsClear () {
            localStorage.clear();
        },
        apiWithToken () {
            const token = localStorage.getItem('token');
            axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: token } })
                 .then(r => console.log(r.data))
                 .catch(e => console.log(e.message))
        },
        apiWithTrash () {
            axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'safasfa' } })
                 .then(r => console.log(r.data))
                 .catch(e => console.log(e.message))
        },
    } 
}
</script>

