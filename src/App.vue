<template>
  <div id="app" class="wrap">
    <headers></headers>
    <keep-alive>
      <router-view :key="$route.fullPath" @changeLikeState="changeLikeState" />
    </keep-alive>
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
  }
};
</script>

<style>
</style>
