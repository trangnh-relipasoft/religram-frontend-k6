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
            <timeago :datetime="post.createAt" :autoUpdate="1"></timeago>
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
    <p
      class="post-view-all"
      v-if="post.comments.length>3"
      style="cursor: pointer"
    >View all {{post.comments.length}} comments</p>
    <div class="post-comment" v-for="(comment,index) in cmShow" :key="index">
      <comment :comment="comment"></comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Home/Comment";
export default {
  components: {
    Comment
  },
  props: {
    post: Object
  },
  data() {
    return {
      cmShow: []
    };
  },
  created() {
    if (this.post.comments.length <= 3)
      this.cmShow = this.cmShow.concat(this.post.comments);
    else {
      this.cmShow = this.cmShow.concat(this.post.comments[0]);
      this.cmShow = this.cmShow.concat(this.post.comments[1]);
      this.cmShow = this.cmShow.concat(
        this.post.comments[this.post.comments.length - 1]
      );
    }
  }
};
</script>