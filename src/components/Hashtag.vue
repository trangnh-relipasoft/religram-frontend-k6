<template>
    <a :href="'#' + to" @click="alert">{{to}}</a>
</template>

<script>
    export default {
        name: "Hashtag",
        props: ['to'],
        methods: {
            alert() {
                alert(this.to)
            }
        }
    }
</script>

<style scoped>

</style>