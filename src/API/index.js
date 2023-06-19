import axios from "axios";

const api = axios.create({
    // baseURL: 'http://10.100.106.156:4000',
    baseURL: 'http://192.168.1.11:8080',
    // baseURL: 'http://172.20.60.7:4000',
    // baseURL: 'http://172.20.61.125:8080',
})

export default api;
