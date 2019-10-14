<template>
  <div class="post-comment__item">
    <div class="post-user">
      <div class="post-avatar">
        <a href="#" title>
          <img :src="comment.user.avatar" alt />
        </a>
      </div>
      <div class="post-userName">
        <p>
          <a href="#" title>{{comment.user.username}}</a>
        </p>
        <p>{{comment.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
};
</script>

<style scoped>
.post-userName {
  width: 90%;
  word-wrap: break-word;
}
</style>