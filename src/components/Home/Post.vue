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
        <span :class="{'post-icon-like': true, active: isLike}" @click="likePost">
          <a title></a>
        </span>
        <span class="post-icon-comment">
          <a title></a>
        </span>
        <span class="post-icon-upload">
          <a title></a>
        </span>
      </p>
      <p v-if="likeCount>1">{{likeCount}} likes</p>
      <p v-else>{{likeCount}} like</p>
    </div>
    <div class="post-title">
      <!-- <p>{{post.content}}</p> -->
      <readMore :text="post.content"></readMore>
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
import ReadMore from "@/components/Expand/ReadMore";

export default {
  components: {
    Comment,
    ReadMore
  },
  props: {
    post: Object
  },
  data() {
    return {
      cmShow: [],
      commentMessage: "",
      isLike: false,
      likeCount: 0
    };
  },
  created() {
    this.likeCount = this.post.likes.length;
    if (this.post.comments.length <= 3)
      this.cmShow = this.cmShow.concat(this.post.comments);
    else {
      this.cmShow = this.cmShow.concat(this.post.comments[0]);
      this.cmShow = this.cmShow.concat(this.post.comments[1]);
      this.cmShow = this.cmShow.concat(
        this.post.comments[this.post.comments.length - 1]
      );
    }
    let id = localStorage.getItem("id");
    for (let i = 0; i < this.post.likes.length; i++) {
      if (this.post.likes[i].user.id == id) {
        this.isLike = true;
        break;
      }
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
    },

    likePost() {
      postApi
        .post(`${this.post.id}/like`)
        .then(res => {
          if (this.isLike) {
            this.isLike = false;
            this.likeCount--;
          } else {
            this.isLike = true;
            this.likeCount++;
          }
        })
        .catch(err => {
          if (err) console.log(err.response);
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
.post-title {
  width: 95%;
  word-wrap: break-word;
}
</style>