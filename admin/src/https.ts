import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
});


export default axiosInstance;


