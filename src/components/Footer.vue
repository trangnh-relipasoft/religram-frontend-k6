<template>
  <div class="footer">
    <input v-show="false" type="file" name="myFile" ref="inputt" @change="onFileSelected" />
    <div class="post-event">
      <span class="icon-home">
        <a @click.stop="backToHome" title>
          <img :src="srcHome" alt />
        </a>
      </span>
      <span class="icon-search">
        <a title>
          <img src="images/footer-icon-search.png" @click="goToSearch" alt />
        </a>
      </span>
      <span class="icon-plus" @click="createPost">
        <a title>
          <img src="images/footer-icon-plus.png" alt />
        </a>
      </span>
      <span>
        <a title @click="goToActivity">
          <img :src="srcActivity" alt />
          <!-- <p v-if="showDot" id="dot">.</p> -->
        </a>
      </span>
      <span class="icon-my-page">
        <a @click="goToProfile" title>
          <img :src="srcProfile" alt />
        </a>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.getItem("noti") == true) this.showDot == true;
    if (this.$route.path == "/") {
      this.srcHome = "images/footer-icon-home.png";
    } else if (this.$route.path == "/profile") {
      this.srcProfile = "images/profile-active.png";
    } else if (this.$route.path == "/activity") {
      this.srcActivity = "images/btn-like_01.png";
    }
  },
  data() {
    return {
      srcHome: "images/home.png",
      srcProfile: "images/footer-icon-my-page.png",
      image: null,
      srcActivity: "images/btn-like_03.png"
    };
  },
  methods: {
    goToSearch(){
       this.$router.push({name: 'search'})
    },
    backToHome() {
      let posY = window.scrollY;
      if (this.$route.path == "/" && posY != 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (this.$route.path == "/" && posY == 0) {
        this.$emit("reload");
      } else {
        this.$router.push({ name: "home" });
      }
    },

    goToProfile() {
      let posY = window.scrollY;
      if (this.$route.path == "/profile" && posY != 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (this.$route.path == "/profile" && posY == 0) {
        this.$emit("reload");
      } else {
        this.$router.push({ name: "profile" });
      }
    },

    goToActivity() {
      let posY = window.scrollY;
      if (this.$route.path == "/activity" && posY != 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (this.$route.path == "/activity" && posY == 0) {
        location.reload();
      } else {
        this.$router.push({ name: "activity" });
      }
    },

    createPost() {
      this.$refs.inputt.click();
    },
    onFileSelected(event) {
      let files = event.target.files;
      let fileReader = new FileReader();
      let imageUrl = null;
      fileReader.addEventListener("load", () => {
        imageUrl = fileReader.result;
        let formData = {
          imageUrl: imageUrl,
          type: "image"
        };
        this.$router.push({ name: "create", query: { pic: formData }, params: { mode: 'post'}});
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

<style scoped>
#dot {
  color: red;
  font-size: 25px;
}

a {
  text-decoration: transparent;
}
</style>