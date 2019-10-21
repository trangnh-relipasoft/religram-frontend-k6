<template>
  <div class="post-user" style="padding-bottom: 5px; cursor:pointer" @click="goToNoti">
    <div class="post-avatar">
      <a>
        <img :src="message.userAvatar" alt />
      </a>
    </div>
    <div class="post-userName" style="width: 68%; word-wrap:break-word">
      <p v-if="message.type == 'follow'">
        <a>{{message.user}}</a>
        started follow you
      </p>
      <p v-else-if="message.type == 'comment'">
        <a title>{{message.user}}</a>
        commented on your post
      </p>
      <p v-else>
        <a title>{{message.user}}</a>
        liked your post
      </p>
      <timeago :datetime="message.createAt" :autoUpdate="1"></timeago>
    </div>
    <a v-if="message.type != 'follow'" id="image">
      <img :src="message.image" />
    </a>

    <a title :class="{btn:true, 'btn-follow':true, active:isFollow}" @click.stop="follow()" v-else>
      <span v-if="isFollow">following</span>
      <span v-else>follow</span>
    </a>
  </div>
</template>

<script>
import user from "@/axios/axios-user";
export default {
  props: {
    message: Object
  },

  data() {
    return {
      isFollow: false
    };
  },

  created() {
    user.get(`/${this.message.userId}`).then(({ data }) => {
      this.isFollow = data.follow;
    });
  },

  methods: {
    follow() {
      if (this.isFollow == false) {
        let formData = {
          type: "follow",
          targetUser: this.message.userId
        };
        this.$store.dispatch("saveNewActivity", formData);
      }
      user.post(`/follow/${this.message.userId}`).then(res => {
        this.isFollow = !this.isFollow;
      });
    },

    goToNoti() {
      if (this.message.type == "follow")
        this.$router.push({
          name: "otherprofile",
          query: { id: this.message.userId }
        });
      else {
        this.$router.push({
          name: "postdetail",
          query: { id: this.message.post }
        });
      }
    }
  }
};
</script>
<style scoped>
.activity-header {
  text-align: center;
  font-weight: 200;
  font-size: 22px;
}
#image {
  display: inline-block;
  width: 40px;
  height: 40px;
  /* margin-top: -3px; */
  margin-left: 5px;
  margin-bottom: 5px;
}
#image img {
  max-width: 100%;
  max-height: 100%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-left: 10px;
}

.activity-text {
  margin-left: 10px;
  margin-top: 8px;
  font-size: 18px;
  position: absolute;
  top: 17%;
  left: 50px;
}
</style>