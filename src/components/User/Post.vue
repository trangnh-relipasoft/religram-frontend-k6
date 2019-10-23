<template>
  <ul class="ul-list-post">
    <li v-for="(post,index) in posts" :key="index">
      <a title>
        <img :src="post.photos[0].photoUri" alt />
      </a>
    </li>
    <infinite-loading @infinite="infiniteHandler" spinner="spiral">
      <span slot="no-more">...</span>
      <div slot="no-results">No post found</div>
    </infinite-loading>
  </ul>
</template>

<script>
import user from "../../axios/axios-user";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    InfiniteLoading
  },

  props: {
    id: String
  },

  data() {
    return {
      posts: [],
      page: 0
    };
  },

  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        user
          .get(`/${this.id}/posts`, {
            params: {
              page: this.page
            }
          })
          .then(({ data }) => {
            if (data.list.length) {
              this.posts = this.posts.concat(data.list);
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
    }
  }
};
</script>