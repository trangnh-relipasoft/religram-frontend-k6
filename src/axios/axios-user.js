import axios from 'axios';

const user = axios.create({
    baseURL: process.env.VUE_APP_BASE_API+ "/api/v1/user",
    timeout: 2000
});
user.defaults.headers.common['Authorization'] = 'Bearer '+ window.localStorage.getItem('token')

export default user