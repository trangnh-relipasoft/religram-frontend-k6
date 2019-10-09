const state = {
    id: Number,
    username: "",
    fullname: "",
    email: "",
    token: "",
    avatar: ""
};
const getters = {};
const mutations = {
    updateUserInfo(state, userData) {
        state.fullname = userData.fullname;
        state.email = userData.email;
        state.username = userData.username;
        localStorage.setItem('fullname', userData.fullname);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('username', userData.username)
    },
};
const actions = {};
export default {
    state,
    mutations,
    actions,
    getters
}
