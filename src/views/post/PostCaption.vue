<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <a href title="">Religram</a>
                <p class="slogan">Heaven in your hands</p>
            </div>
        </div>
        <div class="box-back box-back-v3">
            <a @click="handleCloseOnClicked" href title=""><i aria-hidden="true" class="fa fa-times"></i></a>
            <span>New post</span>
            <a @click.prevent="handleShareOnClicked" href title="">Share</a>
        </div>
        <div class="content">
            <div class="photo-post">
                <div class="post-user">
                    <div class="post-avatar">
                        <a href title=""><img :src="avatar" alt=""/></a>
                        <br><br>
                        <highlightable-input
                                :highlight="highlight"
                                :highlight-enabled="highlightEnabled"
                                align="left"
                                class="captionarea"
                                data-placeholder="Write a caption"
                                v-model="caption"
                        />
                    </div>
                    <div class="post-imgThumb">
                        <img :src="imgSrc" alt=""/>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer"
    import HighlightableInput from "vue-highlightable-input"

    export default {
        name: "PostCaption",
        components: {
            Footer, HighlightableInput
        },
        data() {
            return {
                imgSrc: null,
                caption: '',
                username: localStorage.getItem('username'),
                fullname: localStorage.getItem('fullname'),
                email: localStorage.getItem('email'),
                avatar: localStorage.getItem('avatar'),
                highlight: [
                    {text: /(#[a-z\d-]+)/ig, style: "background-color:#f37373"},
                    // {start: 2, end: 5, style: "background-color:#f330ff"}
                ],
                highlightEnabled: true,
            }
        },
        methods: {
            handleShareOnClicked() {
                console.log(this.caption)
            },
            handleCloseOnClicked() {
                this.$router.push({name: 'home'})
            },
            onSelecthashtag(content) {
                content
                // TODO:
            }
        },
        computed: {
            nodes() {
                return this.caption.split(/#([\w]+)/)
            }
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
        height: 200px;
        width: 400px;
        background-color: #e2e1ee
    }

    [data-placeholder]:empty:before {
        content: attr(data-placeholder);
        color: #888;
        font-style: italic;
    }

</style>