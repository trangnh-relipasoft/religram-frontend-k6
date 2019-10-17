<template>
  <div class="post-comment__item">
    <div class="post-user">
      <div class="post-avatar">
        <a @click="goToUser">
          <img :src="comment.user.avatar" alt />
        </a>
      </div>
      <div class="post-userName">
        <p>
          <a @click="goToUser">{{comment.user.username}}</a>
        </p>
        <readMore :text="comment.content"></readMore>
      </div>
    </div>
  </div>
</template>

<script>
import ReadMore from "@/components/Expand/ReadMore";
export default {
  components: {
    ReadMore
  },
  props: {
    comment: Object
  },
  methods: {
    goToUser() {
      console.log(this.comment.user.id);
      if (this.comment.user.id == localStorage.getItem("id")) {
        this.$router.push("profile");
      } else {
        this.$router.push({
          name: "otherprofile",
          query: { id: this.comment.user.id }
        });
      }
    }
  }
};
</script>

<style scoped>
.post-userName {
  width: 90%;
  word-wrap: break-word;
}
a {
  cursor: pointer;
}
</style>