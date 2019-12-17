const API_URL = "http://localhost:3000"

import axios from "axios"

export default {
    //Planos
    async buscarPlanos(){
        return axios.get(API_URL + "/planos").then(plano => plano.data)
    },

    async editarPlanos(plano){
        return axios.put(API_URL + "/planos", plano ).then (plano => plano.data)
    },

    async adicionarPlanos(plano){
        return axios.post(API_URL + "/planos", plano )
        .then(response => response.data)
    }
}