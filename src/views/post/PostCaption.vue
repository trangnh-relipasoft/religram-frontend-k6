<template>
    <div class="wrap">
        <div class="box-back box-back-v3">
            <a @click="handleCloseOnClicked" href title=""><i aria-hidden="true" class="fa fa-times"></i></a>
            <span>New post</span>
            <a @click.prevent="handleShareOnClicked" href title="">Share</a>
        </div>
        <div class="content">
            <div class="photo-post">
                <div style="width:413px;height: 303px; position: relative">
                    <img :src="imgSrc">
                </div>
            </div>
            <br>
            <div style="height: 200px">
                <highlightable-input
                        :highlight="highlight"
                        :highlight-enabled="highlightEnabled"
                        align="left"
                        class="captionarea"
                        data-placeholder="Write a caption"
                        v-model="caption"/>
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
                imgSrc: localStorage.getItem("avatar_base64_str"),
                caption: '',
                username: localStorage.getItem('username'),
                fullname: localStorage.getItem('fullname'),
                email: localStorage.getItem('email'),
                avatar: localStorage.getItem('avatar'),
                highlight: [
                    {text: /(#[a-z\d-]+)/ig, style: "background-color:#82ccdd"},
                    // {start: 2, end: 5, style: "background-color:#f330ff"}
                ],
                highlightEnabled: true,
            }
        },
        methods: {
            checkCaption(value){
                this.caption = value
                console.log(value)
            },
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
            },
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
        width:413px;
        background-color: #F5F2F1
    }

    [data-placeholder]:empty:before {
        content: attr(data-placeholder);
        color: #888;
        font-style: italic;
    }

</style>