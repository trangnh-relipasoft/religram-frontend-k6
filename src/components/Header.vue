<template>
  <div class="header">
    <div class="logo">
      <a @click="backToHome" style="cursor:pointer">Religram</a>
      <p class="slogan">Heaven in your hands</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backToHome() {
      if (this.$route.path == "/") {
        location.reload();
      } else {
        this.$router.push({ name: "home" });
      }
    }
  }
};
</script>