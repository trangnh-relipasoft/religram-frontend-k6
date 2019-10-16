<template>
  <div class="post-item">
    <div class="post-user">
      <div class="post-avatar">
        <a @click="$router.push({name: 'otherprofile', query:{id : post.user.id}})">
          <img :src="post.user.avatar" alt />
        </a>
      </div>
      <div class="post-userName">
        <p>
          <a
            @click="$router.push({name: 'otherprofile', query:{id : post.user.id}})"
          >{{post.user.username}}</a>
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
          <a title></a>
        </span>
        <span class="post-icon-comment">
          <a title></a>
        </span>
        <span class="post-icon-upload">
          <a title></a>
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
    <form @submit.prevent="postComment">
      <textarea-autosize
        id="text"
        placeholder="Add comment..."
        v-model="commentMessage"
        :min-height="30"
        :max-height="350"
      />
      <img src="../../../public/images/send-icon.png" @click="postComment" />
    </form>
  </div>
</template>

<script>
import Comment from "@/components/Home/Comment";
import postApi from "@/axios/axios-post";

export default {
  components: {
    Comment
  },
  props: {
    post: Object
  },
  data() {
    return {
      cmShow: [],
      commentMessage: ""
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
  },

  methods: {
    postComment() {
      postApi
        .post(`${this.post.id}/comment`, {
          userId: window.localStorage.getItem("id"),
          comment: this.commentMessage.trim(),
          hashtags: []
        })
        .then(res => {
          this.cmShow = this.cmShow.concat({
            user: {
              avatar: window.localStorage.getItem("avatar"),
              username: window.localStorage.getItem("username")
            },
            content: this.commentMessage.trim()
          });
          this.commentMessage = "";
        });
    }
  }
};
</script>

<style scoped>
form {
  display: inline-block;
  position: relative;
  width: 100%;
}
form #text {
  padding-right: 4.6em;
  max-height: 160px;
  min-height: 30px;
  resize: horizontal;
  width: 96%;
  overflow: auto !important;
}
form img {
  background-color: Transparent;
  position: absolute;
  top: 3.5px;
  right: 30px;
  width: 25px;
  cursor: pointer;
  color: beige;
}
</style>