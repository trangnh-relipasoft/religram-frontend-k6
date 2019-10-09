<template>
  <div class="wrap">
    <div class="header">
      <div class="logo">
        <a href @click="$router.push({name: 'home'})" title>Religram</a>
        <p class="slogan">Heaven in your hands</p>
      </div>
    </div>
    <div class="content">
      <div class="profile">
        <div class="profile-header">
          <div class="post-user">
            <div class="post-avatar">
              <a href title>
                <img :src="userData.avatar" alt />
              </a>
            </div>
            <div class="post-userName">
              <p>
                <a href title>{{userData.username}}</a>
              </p>
              <p>
                <a class="edit-proflie btn">Edit profile</a>
              </p>
            </div>
          </div>
          <div class="post-user__name">
            <p>{{userData.fullname}}</p>
          </div>
        </div>
        <div class="profile-content">
          <div class="tab">
            <div class="tab-title">
              <a :class="{active:isPost}" @click="showPost" style="cursor:pointer">
                <span>{{userData.post}}</span>
                <p v-if="userData.post >1">posts</p>
                <p v-else>post</p>
              </a>
              <a :class="{active:isFollower}" @click="showFollower" style="cursor:pointer">
                <span>{{userData.follower}}</span>
                <p v-if="userData.follower >1">followers</p>
                <p v-else>follower</p>
              </a>
              <a :class="{active:isFollowing}" @click="showFollowing" style="cursor:pointer">
                <span>{{userData.following}}</span>
                following
              </a>
            </div>
            <div class="tab-content">
              <keep-alive>
                <post v-if="isPost" :id="id"></post>
                <follower
                  v-if="isFollower"
                  :id="id"
                  :yourId="yourId"
                  :followers="followers"
                  @updateFollow="update"
                ></follower>
                <follower v-if="isFollowing" :id="id" :yourId="yourId" :followers="followings"></follower>
              </keep-alive>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footers></footers>
  </div>
</template>

<script>
import Post from "../../components/User/Post";
import Footers from "../../components/Footer";
import user from "../../axios/axios-user";
import Follower from "../../components/User/Follower";
export default {
  components: {
    Post,
    Footers,
    Follower
  },
  created() {
    this.id = localStorage.getItem("id");
    this.getData();
    this.getFollowers();
    this.getFollowings();
  },

  data() {
    return {
      id: Number,
      userData: {},
      isFollow: Boolean,
      isPost: true,
      isFollower: false,
      isFollowing: false,
      yourId: localStorage.getItem("id"),
      followers: [],
      followings: []
    };
  },

  methods: {
    getData() {
      user
        .get(`/${this.id}`)
        .then(res => {
          this.userData = res.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },

    showPost() {
      (this.isPost = true),
        (this.isFollower = false),
        (this.isFollowing = false);
    },

    showFollower() {
      (this.isPost = false),
        (this.isFollower = true),
        (this.isFollowing = false);
    },

    showFollowing() {
      (this.isPost = false),
        (this.isFollower = false),
        (this.isFollowing = true);
    },

    getFollowers() {
      user
        .get(`/${this.id}/follower`)
        .then(res => {
          this.followers = res.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },

    getFollowings() {
      user
        .get(`/${this.id}/following`)
        .then(res => {
          this.followings = res.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },

    update() {
      this.getData();
      this.getFollowers();
      this.getFollowings();
    }
  }
};
</script>