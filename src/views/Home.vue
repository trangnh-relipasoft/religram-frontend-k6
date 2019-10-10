<template>
  <div>
    <div class="home">
      <img alt="Relipa Software" src="../assets/Relipa-text-2.png" />
      <HelloWorld msg="Welcome" />
      <p v-show="!this.$store.state.token == ''">Your logged in</p>
      <br />
      <p>Wanna click something? Hmmmmm</p>
      <button @click="login" class="btn btn-primary" v-show="this.$store.getters.token ==''">Log in</button>
      <button
        @click="logout"
        class="btn btn-primary"
        v-show="this.$store.getters.token !=''"
      >Log out</button>
    </div>
    <footers></footers>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Footers from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Footers
  },
  mounted() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("clearAuth");
      console.log(this.$store.state.username);
    },

    login() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
