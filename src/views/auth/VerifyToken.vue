<template></template>

<script>
    import auth from "../../axios/axios-auth";

    export default {
        created() {
            let token = this.$route.query.token;
            let path = "/verify/" + token;
            auth
                .get(path)
                .then(res => {
                    if (res.status == 200) {
                        this.$store.state.token = token;
                        this.$router.push({name: "resetpassword"});
                    }
                })
                .catch(err => {
                    if (err) {
                        console.log(err.response);
                        this.$router.push({
                            name: "forgotpassword",
                            query: {isError: true}
                        });
                    }
                });
        }
    };
</script>