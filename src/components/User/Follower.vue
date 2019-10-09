<template>
  <ul class="ul-list-followers">
    <li v-for="(follower,index) in followers" :key="index">
      <div class="post-user">
        <div class="post-avatar">
          <a href @click="getUser(follower.id)" title>
            <img :src="follower.avatar" alt />
          </a>
        </div>
        <div class="post-userName">
          <p>
            <a href @click="getUser(follower.id)" title>{{follower.username}}</a>
          </p>
        </div>
      </div>
      <a
        href="#"
        title
        :class="{btn:true, 'btn-follow':true, active:follower.isFollow}"
        @click.stop="follow(follower.id, index)"
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
export default {
  props: {
    id: String,
    yourId: String,
    followers: Array
  },

  methods: {
    follow(targetId, index) {
      console.log(targetId, index, this.yourId);
      if (targetId != this.yourId) {
        user.post(`/follow/${targetId}`).then(res => {
          this.followers[index].isFollow = !this.followers[index].isFollow;
        });
      }
    },

    getUser(userId) {
      this.$router.push({ name: "otherprofile", query: { id: userId } });
    }
  }
};
</script>

<style scoped>
.disableButton {
  background-color: rgb(209, 206, 206);
}
</style>