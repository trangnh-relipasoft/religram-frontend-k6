<template>
  <ul class="ul-list-followers">
    <li v-for="(follower,index) in followers" :key="index">
      <div class="post-user">
        <div class="post-avatar">
          <a @click="getUser(follower.id)">
            <img :src="follower.avatar" alt />
          </a>
        </div>
        <div class="post-userName">
          <p>
            <a @click="getUser(follower.id)" title>{{follower.username}}</a>
          </p>
        </div>
      </div>
      <a
        title
        :class="{btn:true, 'btn-follow':true, active:follower.isFollow}"
        @click="follow(follower.id, index, follower.isFollow)"
        v-if="follower.id != yourId"
      >
        <span v-if="follower.isFollow">following</span>
        <span v-else>follow</span>
      </a>
    </li>
  </ul>
</template>

<script>
import user from "../../axios/axios-user";
import {eventBus} from "../../main";
export default {
  props: {
    id: String,
    yourId: String,
    followers: Array
  },

  methods: {
    follow(targetId, index, isFollow) {
      if (isFollow == false) {
        let formData = {
          type: "follow",
          targetUser: this.id
        };
        console.log("here");
        this.$store.dispatch("saveNewActivity", formData);
      }
      if (targetId != this.yourId) {
        user.post(`/follow/${targetId}`).then(res => {
          this.followers[index].isFollow = !this.followers[index].isFollow;
          this.$emit("updateFollow")
          eventBus.$emit("updateFollow");
        });
      }
    },

    getUser(userId) {
      if (userId == this.yourId) this.$router.push({ name: "profile" });
      else this.$router.push({ name: "otherprofile", query: { id: userId } });
    }
  }
};
</script>

<style scoped>
.disableButton {
  background-color: rgb(209, 206, 206);
}
</style>