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
              <span :class="{'post-icon-like': true, active: isLike}">
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
              <comment :comment="comment"></comment>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      index: 0
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
        this.likeCount = this.post.comments.length;
        this.cmCount = this.post.comments.length;
        this.index = 0;
        if (this.post.comments.length < 10)
          this.cmShow = this.cmShow.concat(this.post.comments);
        else {
          if (this.index < this.post.comments.length) {
            let des = this.index + 9;
            if (des > this.post.comments.length)
              des = this.post.comments.length - 1;

            for (let i = this.index; i <= des; i++) {
              this.cmShow.unshift(this.post.comments[i]);
            }
            this.index = des + 1;
          }
        }
      });
    },

    viewMoreCm() {
      if (this.index < this.post.comments.length) {
        let des = this.index + 9;
        if (des >= this.post.comments.length)
          des = this.post.comments.length - 1;

        for (let i = this.index; i <= des; i++) {
          this.cmShow.unshift(this.post.comments[i]);
        }

        this.index = des + 1;
      }
    }
  }
};
</script>