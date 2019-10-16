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
    },
    updateAvatar(state, userData) {
        state.avatar = userData.avatar;
        localStorage.setItem('avatar', userData.avatar);
    },
};
const actions = {};
export default {
    state,
    mutations,
    actions,
    getters
}
