<template>
  <div class="post-comment__item">
    <div class="post-user">
      <div class="post-avatar">
        <a @click="$router.push({name: 'otherprofile', query:{id : comment.user.id}})">
          <img :src="comment.user.avatar" alt />
        </a>
      </div>
      <div class="post-userName">
        <p>
          <a
            @click="$router.push({name: 'otherprofile', query:{id : comment.user.id}})"
          >{{comment.user.username}}</a>
        </p>
        <p style="white-space: pre-line;">{{comment.content}}</p>
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
a {
  cursor: pointer;
}
</style>