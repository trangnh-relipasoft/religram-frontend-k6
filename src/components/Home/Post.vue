<template>
  <div class="post-item">
    <div class="post-user">
      <div class="post-avatar">
        <a title>
          <img :src="post.user.avatar" alt />
        </a>
      </div>
      <div class="post-userName">
        <p>
          <a title>{{post.user.username}}</a>
        </p>
        <p>
          <span class="post-date">
            <timeago :datetime="post.createAt"></timeago>
          </span>
        </p>
      </div>
    </div>
    <div class="post-image">
      <p class="post-thumb">
        <img :src="post.photos[0].photoUri" alt />
      </p>
    </div>
    <div class="post-event">
      <p>
        <span class="post-icon-like">
          <a href="#" title></a>
        </span>
        <span class="post-icon-comment">
          <a href="#" title></a>
        </span>
        <span class="post-icon-upload">
          <a href="#" title></a>
        </span>
      </p>
      <p>{{post.likes.length}} likes</p>
    </div>
    <div class="post-title">
      <p>{{post.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
};
</script>