<template>
    <div class="wrap">
        <div class="box-back box-back-v3">
            <a @click="$router.go(-1)" title="">
                <img alt class="fa fa-times" src="images/back-icon.png"/>
            </a>
            <span>New post</span>
            <a @click.prevent="handleShareOnClicked" href title="">Share</a>
        </div>
        <div style="width:413px;height: 303px;">
            <img :src="imgSrc">
        </div>
        <div style="height: 10px"></div>
        <div style="height: 200px">
            <highlightable-input
                    :highlight="highlight"
                    :highlight-enabled="highlightEnabled"
                    align="left"
                    class="captionarea hightlightcontainer" data-placeholder="Write a caption" v-model="caption"/>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer"
    import HighlightableInput from "vue-highlightable-input"
    import axios_post from "@/axios/axios-post";

    export default {
        name: "PostCaption",
        components: {
            Footer, HighlightableInput
        },
        data() {
            return {
                imgSrc: localStorage.getItem("avatar_base64_str"),
                caption: '<a href=\"/profile\"/>',
                username: localStorage.getItem('username'),
                fullname: localStorage.getItem('fullname'),
                email: localStorage.getItem('email'),
                avatar: localStorage.getItem('avatar'),
                highlight: [
                    {text: /(#[a-z\d-]+)/ig, style: "background-color:#82ccdd"},
                    // {start: 2, end: 5, style: "background-color:#f330ff"}
                ],
                highlightEnabled: true,
                hashtags: []
            }
        },
        methods: {
            handleShareOnClicked() {
                var hashtags = this.caption.match(/(#[a-z\d-]+)/ig);
                if (hashtags === null) {
                    hashtags = []
                }
                let postData = {
                    "userId": "99",
                    "caption": this.caption,
                    "images": [this.imgSrc.slice(22)],
                    "hashtags": hashtags
                };
                axios_post.post('', postData, {
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.$router.push({name: 'home'})
                    }
                }).catch(reason => {
                    console.log(reason)
                });
            },
            onSelecthashtag(content) {
                content
                // TODO:
            }
        },
        computed: {
            detectHashtag: function () {
                if (this.caption.length > 0) {
                    if (this.caption)
                        this.caption = this.caption.replace(/(#[a-z\d-]+)/ig, '<a @click="someAction">#$1</a>')
                }
            },
            // dynamicComponent: function() {
            //     return {
            //         template: `<div>${this.hashTags(this.message)}</div>`,
            //         methods: {
            //             someAction() {
            //                 console.log("Action!");
            //             }
            //         }
            //     }
            // }
        },
        watch: {
            query() {
                this.highlightSyntax();
            },
        },
    }

</script>

<style scoped>
    .captionarea {
        height: 200px !important;
        width: 400px;
        background-color: #F5F2F1;
        overflow-y: scroll;
        resize: none;
    }

    .hightlightcontainer {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    [data-placeholder]:empty:before {
        content: attr(data-placeholder);
        color: #888;
        font-style: italic;
    }

</style>