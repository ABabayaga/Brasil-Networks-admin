// const API_URL = 'http://localhost:3000'
const API_URL = 'https://brnw.herokuapp.com'

import axios from "axios"

export default {
    //Planos
    async buscarPlanos() {
        return axios.get(API_URL + "/plano").then(plano => plano.data)
    },

    async editarPlano(plano) {
        return axios.put(API_URL + "/plano", plano).then(plano => plano.data)
    },

    async adicionarPlanos(plano) {
        return axios.post(API_URL + "/plano", plano).then(plano => plano.data)
    },

    //Usuários
    async buscarUsuarios() {
        return axios.get(API_URL + "/usuarios").then(response => response.data);
    },
    async salvarUsuario(usuario) {
        return axios
            .post(API_URL + "/usuarios", usuario)
            .then(response => response.data);
    },

    async mudarStatus(usuario) {
        return axios.put(API_URL + "/usuarios", usuario).then(usuario => usuario.data);
    },

    //Login
    async autenticar(usuario) {
        return axios
            .post(API_URL + "/autenticar", usuario)
            .then(autenticar => autenticar.data);
    },
}