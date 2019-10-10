import axios from 'axios';

<<<<<<< HEAD
const axios_user = axios.create({
    baseURL: process.env.VUE_APP_BASE_API+ "/api/v1/user",
    timeout: 5000
});


export default axios_user
=======
const user = axios.create({
    baseURL: process.env.VUE_APP_BASE_API+ "/api/v1/user",
    timeout: 2000
});
user.defaults.headers.common['Authorization'] = 'Bearer '+ window.localStorage.getItem('token')

export default user
>>>>>>> k6_32
