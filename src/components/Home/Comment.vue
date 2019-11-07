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
                        <a @click="reply" style="color: #444444">reply</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="post-comment__item" style="margin-left: 5%" v-if="comment.replyComments.length">
            <p @click="viewMoreCm" class="post-view-all"
               style="cursor: pointer; margin-left: 5%"
               v-if="rCmShow.length < rCmCount">View more {{rCmCount - rCmShow.length}} replies</p>
            <div :key="replycomment.id" id="comment" v-for="replycomment in formated">
                <ReplyComment :comment="replycomment" :postID="postID" :targetComment="comment"
                              key="commentpostdetail"></ReplyComment>
            </div>
        </div>
    </div>

</template>

<script>
    import ReadMore from "@/components/Expand/ReadMore";
    import ReplyComment from "./ReplyComment";
    import {eventBus} from "../../main";

    export default {
        name: "comment",
        components: {
            ReadMore, ReplyComment
        },
        data() {
            return {
                rCmShow: [],
                rCmCount: 0,
                index: 1e9,
                rComments: [],
            }
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
        computed: {
            formated() {
                this.rComments = this.comment.replyComments;
                this.rCmCount = this.rComments.length;
                this.index = Math.min(this.rComments.length - 1, this.index);
                if (this.rComments.length < 4)
                    this.rCmShow = this.rCmShow.concat(this.rComments);
                else {
                    if (this.index > 0) {
                        let des = this.index - 2;
                        if (des < 0) des = 0;
                        for (let i = this.index; i >= des; i--) {
                            this.rCmShow.unshift(this.rComments[i]);
                        }
                        this.index = des - 1;
                    }
                }
                return [...new Set(this.rCmShow)].sort(function (a, b) {
                    return a.createAt.localeCompare(b.createAt);
                });
            },
        },
        methods: {
            reply() {
                eventBus.$emit("replyComment", this.postID, this.targetComment.id, this.targetComment.user.username)
            },
            viewMoreCm() {
                if (this.index > 0) {
                    let des = this.index - 5;
                    if (des < 0) des = 0;
                    for (let i = this.index; i >= des; i--) {
                        this.rCmShow.unshift(this.rComments[i]);
                    }
                    this.index = des - 1;
                }
            },
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
            }
        }
    };
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