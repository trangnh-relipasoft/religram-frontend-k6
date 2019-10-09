<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  created() {
    // this.$router.push({ name: "login" });
    this.$store.dispatch("tryToLogin");
    // if (this.$store.state.token == "") this.$router.push({ name: "login" });
  }
};
</script>

<style>
</style>
