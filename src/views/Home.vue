<template>
  <div class="wrap">
    <div class="content">
      <div class="post-list" v-for="(post,index) in posts" :key="index">
        <post :post="post"></post>
        <br />
        <br />
      </div>
    </div>
    <footers></footers>
  </div>
</template>

<script>
// @ is an alias to /src
import Footers from "@/components/Footer.vue";
import postApi from "@/axios/axios-post";
import Post from "@/components/Home/Post";

export default {
  name: "home",
  components: {
    Footers,
    Post
  },

  created() {
    postApi
      .get("", {
        params: {
          page: 0
        }
      })
      .then(({ data }) => {
        this.posts = data.list;
        console.log(this.posts);
      })
      .catch(err => {
        if (err) console.log(err.response);
      });
  },

  data() {
    return {
      posts: []
    };
  },
  mounted() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  }
};
</script>
