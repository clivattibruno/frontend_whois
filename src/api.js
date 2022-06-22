import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.18.14.234:3002'
});

export default api;