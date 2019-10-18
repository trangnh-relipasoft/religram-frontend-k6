<template>
  <div id="app">
    <croppa
      v-model="myCroppa"
      :width="300"
      :height="350"
      :prevent-white-space="true"
      :disable="true"
    ></croppa>
  </div>
</template>
<script>
export default {
  data() {
    return { myCroppa: {} };
  }
};
</script>