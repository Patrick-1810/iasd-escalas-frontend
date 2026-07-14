import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:8001/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("@IASDEscalas:token");

    if(token && config.headers){
        config.headers.Authorization = 'Bearer ${token}';

    }

    return config;

});