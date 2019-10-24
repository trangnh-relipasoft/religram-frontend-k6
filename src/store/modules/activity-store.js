const state = {
  messages: []
};

const mutations = {
  addMessage(state, message) {
    state.messages.unshift(message);
    localStorage.setItem("messages", JSON.stringify(state.messages));
  }
};

const getters = {};

const actions = {
  saveNewActivity({ commit }, formData) {
    console.log(formData);
    if (formData.type == "follow") {
      db.collection(`${formData.targetUser}`).add({
        userId: window.localStorage.getItem("id"),
        type: "follow",
        user: window.localStorage.getItem("username"),
        userAvatar: window.localStorage.getItem("avatar"),
        createAt: new Date().getTime()
      });
    } else {
      let type = formData.type;
      console.log(`${formData.targetUser}`);
      db.collection(`${formData.targetUser}`).add({
        userId: window.localStorage.getItem("id"),
        type: type,
        user: window.localStorage.getItem("username"),
        userAvatar: window.localStorage.getItem("avatar"),
        createAt: new Date().getTime(),
        image: formData.image,
        post: formData.postId
      });
    }
  },

  fetchMessages({ commit }, create) {
    db.collection(localStorage.getItem("id"))
      .orderBy("createAt")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            commit("addMessage", change.doc.data());
            if (create == false) localStorage.setItem("noti", true);
          }
        });
        create = false;
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
