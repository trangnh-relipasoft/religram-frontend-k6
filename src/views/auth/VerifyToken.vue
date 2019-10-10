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
                        localStorage.setItem('token', token);
                        this.$router.push({name: "resetpassword"});
                    }
                })
                .catch(err => {
                    if (err) {
                        this.$router.push({
                            name: "forgotpassword",
                            query: {isError: true}
                        });
                    }
                });
        }
    };
</script>