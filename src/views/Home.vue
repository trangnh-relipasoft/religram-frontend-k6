<template>
  <div class="wrap">
    <div class="content">
      <div class="post-list" v-for="(post,index) in posts" :key="index">
        <post :post="post"></post>
        <br />
        <br />
      </div>
      <infinite-loading @infinite="infiniteHandler" spinner="spiral">
        <span slot="no-more">...</span>
        <div slot="no-results">No post found</div>
      </infinite-loading>
    </div>
    <footers key="footerhome" @reload="reload"></footers>
  </div>
</template>

<script>
// @ is an alias to /src
import Footers from "@/components/Footer.vue";
import postApi from "@/axios/axios-post";
import Post from "@/components/Home/Post";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "home",
  components: {
    Footers,
    Post,
    InfiniteLoading
  },

  // created() {
  //   postApi
  //     .get("", {
  //       params: {
  //         page: 0
  //       }
  //     })
  //     .then(({ data }) => {
  //       this.posts = data.list;
  //       console.log(this.posts);
  //     })
  //     .catch(err => {
  //       if (err) console.log(err.response);
  //     });
  // },

  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        postApi
          .get("", {
            params: {
              page: this.page
            }
          })
          .then(({ data }) => {
            if (data.list.length) {
              this.posts = this.posts.concat(data.list);
              console.log(this.posts);
              this.page++;
              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }, 1000);
    },

    reload() {
      location.reload();
    }
  },

  data() {
    return {
      posts: [],
      page: 0
    };
  },
  mounted() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
