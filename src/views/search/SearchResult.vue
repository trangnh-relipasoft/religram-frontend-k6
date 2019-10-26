<template>
    <ul class="ul-list-followers">
        <li :key="index" v-for="(follower,index) in users" v-if="follower.id!=yourId">
            <div class="post-user">
                <div class="post-avatar" style="margin-left: 10%">
                    <a @click="getUser(follower.id)">
                        <img :src="follower.avatar" alt/>
                    </a>
                </div>
                <div class="post-userName">
                    <p>
                        <a @click="getUser(follower.id)" title>{{follower.username}}</a>
                    </p>
                </div>
            </div>
            <a :class="{btn:true, 'btn-follow':true, active:follower.isFollow}"
               @click="follow(follower.id, index, follower.isFollow)"
               style="margin-right: 10%"
               title v-if="follower.id != yourId">
                <span v-if="follower.isFollow">following</span>
                <span v-else>follow</span>
            </a>
        </li>
    </ul>
</template>

<script>
    import user from "../../axios/axios-user";

    export default {
        name: "SearchResult",
        props: {
            id: String,
            yourId: String,
            users: Array
        },
        methods: {
            follow(targetId, index, isFollow) {
                if (isFollow == false) {
                    let formData = {
                        type: "follow",
                        targetUser: targetId
                    };
                    this.$store.dispatch("saveNewActivity", formData);
                }
                if (targetId != this.yourId) {
                    user.post(`/follow/${targetId}`).then(res => {
                        this.users[index].isFollow = !this.users[index].isFollow;
                    });
                }
            },
            getUser(userId) {
                if (userId == this.yourId) this.$router.push({name: "profile"});
                else this.$router.push({name: "otherprofile", query: {id: userId}});
            }
        }
    };
</script>

<style scoped>
    .disableButton {
        background-color: rgb(209, 206, 206);
    }
    .post-user{
        display: flex !important;
        align-items: center;
        padding: 0 10px;
        width: 80% !important;
    }
</style>