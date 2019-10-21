<template>
  <div id="app" class="wrap">
    <headers></headers>
    <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <div class="message message-success" v-show="showNoti" @click="$router.push({name:'activity'})">
      <p>You got new notification</p>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header";

export default {
  components: {
    Headers
  },
  created() {
    // this.$router.push({ name: "login" });
    this.$store.dispatch("tryToLogin");
    // if (this.$store.state.token == "") this.$router.push({ name: "login" });
    this.fetchMessages();
  },

  data() {
    return {
      isCreate: true,
      showNoti: false
    };
  },
  methods: {
    fetchMessages() {
      db.collection(localStorage.getItem("id"))
        .orderBy("createAt")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              if (this.isCreate == false) {
                console.log("here");
                this.showNoti = true;
                setTimeout(() => {
                  this.showNoti = false;
                }, 3000);
              }
            }
          });
          this.isCreate = false;
        });
    }
  }
};
</script>

<style>
</style>
