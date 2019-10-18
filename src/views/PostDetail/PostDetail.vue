<template>
  <div>
    <div class="box-back box-back-v2">
      <a href="#" title>
        <i class="fa fa-angle-left" aria-hidden="true"></i>Photo
      </a>
    </div>
    <div class="content">
      <div class="post-list">
        <div class="post-item">
          <div class="post-user">
            <div class="post-avatar">
              <a>
                <img :src="post.user.avatar" alt />
              </a>
            </div>
            <div class="post-userName">
              <p>
                <a>{{post.user.username}}</a>
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
                <a></a>
              </span>
              <span class="post-icon-comment">
                <a title></a>
              </span>
              <span class="post-icon-upload">
                <a title></a>
              </span>
            </p>
            <p v-if="likeCount>1" style="font-weight: bold">{{likeCount}} likes</p>
            <p v-else style="font-weight: bold">{{likeCount}} like</p>
          </div>
          <div class="post-title">
            <readMore :text="post.content"></readMore>
          </div>
          <div class="post-comment">
            <p
              class="post-view-all"
              v-if="cmShow.length< cmCount"
              style="cursor: pointer"
              @click="viewMoreCm"
            >View more {{cmCount - cmShow.length}} comments</p>
            <div v-for="comment in cmShow" :key="comment.id">
              <comment :comment="comment" key="commentpostdetail"></comment>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="postComment">
      <textarea-autosize
        id="text"
        placeholder="Add comment..."
        v-model="commentMessage"
        :min-height="25"
        :max-height="350"
      />

      <p
        v-if="commentMessage.trim() != ''"
        style="color: rgb(25, 122, 255);"
        @click="postComment"
      >post</p>
      <p v-else style="color: rgb(199, 241, 247); cursor: default">post</p>
      <!-- <img src="../../../public/images/send-icon.png"  /> -->
    </form>
    <footers key="footerpostdetail"></footers>
  </div>
</template>
<script>
import Footers from "@/components/Footer";
import postApi from "@/axios/axios-post";
import Comment from "@/components/Home/Comment";
import ReadMore from "@/components/Expand/ReadMore";
export default {
  components: {
    Footers,
    Comment,
    ReadMore
  },
  created() {
    this.id = this.$route.query.id;
    this.getDataPost();
  },
  data() {
    return {
      id: "",
      post: {},
      isLike: false,
      likeCount: 0,
      cmShow: [],
      cmCount: 0,
      index: 0,
      commentMessage: ""
    };
  },

  methods: {
    getDataPost() {
      postApi.get(`/${this.id}`).then(res => {
        this.post = res.data;
        let id = localStorage.getItem("id");
        for (let i = 0; i < this.post.likes.length; i++) {
          if (this.post.likes[i].user.id == id) {
            this.isLike = true;
            break;
          }
        }
        console.log(this.post.comments);
        this.likeCount = this.post.likes.length;
        this.cmCount = this.post.comments.length;
        this.index = this.post.comments.length - 1;
        if (this.post.comments.length < 10)
          this.cmShow = this.cmShow.concat(this.post.comments);
        else {
          if (this.index > 0) {
            let des = this.index - 9;
            if (des < 0) des = 0;

            for (let i = this.index; i >= des; i--) {
              this.cmShow.unshift(this.post.comments[i]);
            }
            this.index = des - 1;
          }
        }
      });
    },

    viewMoreCm() {
      if (this.index > 0) {
        let des = this.index - 9;
        if (des < 0) des = 0;

        for (let i = this.index; i >= des; i--) {
          this.cmShow.unshift(this.post.comments[i]);
        }
        this.index = des - 1;
      }
    },

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
    },

    goToUser() {
      if (this.post.user.id == localStorage.getItem("id")) {
        this.$router.push("profile");
      } else {
        this.$router.push({
          name: "otherprofile",
          query: { id: this.post.user.id }
        });
      }
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
form p {
  position: absolute;
  top: 4.5px;
  right: 30px;
  width: 25px;
  cursor: pointer;
}
#text {
  font-family: "Roboto", sans-serif;
}
</style>