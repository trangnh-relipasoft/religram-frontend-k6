<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <a href title>Religram</a>
                <p class="slogan">Heaven in your hands</p>
            </div>
        </div>
        <div class="content">
            <div class="form form-login">
                <form @submit.prevent="onSubmit" id="form_login">
                    <!-- <p v-if="!$v.username.$error" style="color:green">Ting ting</p>
                    <p v-if="!$v.username.required" style="color:red">Usename is required</p>
                    <p v-if="!$v.username.minLength" style="color:red">Usename is too short</p>
                    <p v-if="!$v.username.maxLength" style="color:red">Usename is too long</p>-->

                    <input
                            :class="{invalid: $v.username.$error}"
                            class="input-text"
                            id="username"
                            name="login-user"
                            placeholder="Username or Email"
                            type="text"
                            v-model="username"
                    />
                    <input
                            :class="{invalid: $v.password.$error}"
                            class="input-text"
                            id="password"
                            name="login-pass"
                            placeholder="Password"
                            type="password"
                            v-model="password"
                    />
                    <button
                            :class="{disableButton: ($v.email.$error || $v.username.$error) && $v.password.$error}"
                            class="btn btn-full"
                            id="login_submit"
                            name="login-submit"
                            type="submit"
                    >Log in
                    </button>
                </form>
                <div class="label-break">
                    <span>or</span>
                </div>
                <div class="login-fb">
                    <p>
                        <i aria-hidden="true" class="fa fa-facebook-square"></i>
                        <a @click="logInWithFacebook">Log in with facebook</a>
                    </p>
                </div>
                <p class="forgot-pass">
                    <a @click="$router.push({name: 'forgotpassword'})" href title>Forgot password?</a>
                </p>
            </div>
            <div class="sign-up">
                <p>
                    Don't have an account?
                    <a @click="signup" href>Sign up</a>
                </p>
            </div>
        </div>
        <div class="message message-error" v-show="error != ''">
            <p>{{error}}</p>
        </div>
    </div>
</template>

<script>

    window.fbAsyncInit = function () {
        FB.init({
            appId: "375868253100420",
            cookie: true, // This is important, it's not enabled by default
            version: "v2.2"
        });
    };

    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
    import auth from "../../axios/axios-auth";
    import {email, password, username} from "../../validate/validate"

    export default {
        data() {
            return {
                username: "",
                password: "",
                error: ""
            };
        },

        validations: {
            username, password, email
        },

        methods: {
            logInWithFacebook() {
                FB.login(
                    response => {
                        if (response.authResponse) {
                            const access_token = response.authResponse.accessToken;
                            // console.log(access_token);
                            auth
                                .post("/login/facebook", {accessToken: access_token})
                                .then(res => {
                                    if (res.status == 200) {
                                        let userData = {
                                            id: res.data.user.id,
                                            username: res.data.user.username,
                                            email: res.data.user.email,
                                            fullname: res.data.user.fullname,
                                            token: res.data.token,
                                            avatar: res.data.user.avatar,
                                        };
                                        this.$store.dispatch("authUser", userData);
                                        this.$router.push({name: "home"});
                                    }
                                })
                                .catch(err => {
                                    if (err) {
                                        auth
                                            .post("/signup/facebook", {accessToken: access_token})
                                            .then(res => {
                                                localStorage.setItem('email', res.data.email);
                                                localStorage.setItem("avatar", res.data.avatar);
                                                localStorage.setItem("fullname", res.data.fullname);
                                                this.$router.push({name: "signupfacebook"})
                                            });
                                    }
                                });
                        }
                    },
                    {scope: "email", auth_type: "reauthenticate"}
                );
                return false;
            },
            onSubmit() {
                this.$v.$touch();
                console.log(this.$v.email);
                if ((!this.$v.email.$error || !this.$v.username.$error) && !this.$v.password.$error) {
                    let formData = {
                        username: this.username,
                        password: this.password
                    };
                    auth
                        .post("/login", formData)
                        .then(res => {
                            if (res.status == 200) {
                                let userData = {
                                    id: res.data.user.id,
                                    username: res.data.user.username,
                                    email: res.data.user.email,
                                    fullname: res.data.user.fullname,
                                    token: res.data.token,
                                    avatar: res.data.user.avatar
                                };
                                this.$store.dispatch("authUser", userData);
                                this.$router.push({name: "home"});
                            }
                        })
                        .catch(err => {
                            if (err) {
                                this.error = err.response.data.message;
                                setTimeout(() => this.error = "", 2000)
                            }
                        });
                }
            },
            signup() {
                this.$router.push({name: "signup"});
            }
        }
    };
</script>

<style scoped>
    .invalid {
        border-width: 2px;
        border-color: rgb(226, 35, 35);
    }

    .disableButton {
        background-color: grey;
    }
</style>