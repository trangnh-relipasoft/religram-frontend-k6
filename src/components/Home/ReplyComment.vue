<template>
    <div>
        <div class="post-comment__item">
            <div class="post-user">
                <div class="post-avatar">
                    <a @click="goToUser">
                        <img :src="comment.user.avatar" alt/>
                    </a>
                </div>
                <div class="post-userName">
                    <p>
                        <a @click="goToUser">{{comment.user.username}}</a>
                    </p>
                    <readMore :text="comment.content"></readMore>
                    <span class="comment-info">
                        <timeago :autoUpdate="1" :datetime="comment.createAt"></timeago> *
                        <a @click="reply" style="color: #444444; font-weight: normal">reply</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ReadMore from "@/components/Expand/ReadMore";
    import {eventBus} from "../../main";

    export default {
        name: "ReplyComment",
        components: {
            ReadMore
        },
        props: {
            comment: Object,
            postID: {
                default: -1,
                type: Number
            },
            targetComment: {
                default: -1,
                type: Object
            }
        },
        methods: {
            goToUser() {
                console.log(this.comment.user.id);
                if (this.comment.user.id == localStorage.getItem("id")) {
                    this.$router.push("profile");
                } else {
                    this.$router.push({
                        name: "otherprofile",
                        query: {id: this.comment.user.id}
                    });
                }
            },
            reply() {
                eventBus.$emit("replyComment", this.postID, this.targetComment.id, this.comment.user.username)
            },
        },
    }

</script>

<style scoped>
    .post-userName {
        width: 90%;
        word-wrap: break-word;
    }

    a {
        cursor: pointer;
    }
    .comment-info {
        font-family: "Roboto", sans-serif;
        font-size: 13px;
        color: #444444 !important;
    }
</style>