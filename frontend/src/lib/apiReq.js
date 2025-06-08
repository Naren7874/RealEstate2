import axios from 'axios';

const apiReq = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`||'http://localhost:8080/api', 
    withCredentials:true,
});

export default apiReq;
