import axios from 'axios';

const axios_user = axios.create({
    baseURL: process.env.VUE_APP_BASE_API+ "/api/v1/user",
    timeout: 5000
});


export default axios_user
