<template>
    <div class="wrap">
        <div class="content">
            <div class="form form-sign-up">
                <div class="login-fb login-fb-v2">
                    <p>
                        <i aria-hidden="true" class="fa fa-facebook"></i>
                        <a @click="logInWithFacebook()">Log in with facebook</a>
                    </p>
                </div>
                <div class="label-break">
                    <span>or</span>
                </div>
                <form @submit.prevent="onSubmit" id="form_sign_up">
                    <input
                            :class="{invalid: $v.email.$error}"
                            class="input-text"
                            id="email"
                            name="signup-email"
                            placeholder="Email"
                            type="text"
                            v-model="email"
                    />
                    <input
                            :class="{invalid: $v.fullname.$error}"
                            class="input-text"
                            id="fullname"
                            name="signup-name"
                            placeholder="Full name"
                            type="text"
                            v-model="fullname"
                    />
                    <input
                            :class="{invalid: $v.username.$error}"
                            class="input-text"
                            id="username"
                            name="signup-user"
                            placeholder="User name"
                            type="text"
                            v-model="username"
                    />
                    <input
                            :class="{invalid: $v.password.$error}"
                            class="input-text"
                            id="password"
                            name="signup-pass"
                            placeholder="Password"
                            type="password"
                            v-model="password"
                    />
                    <input
                            :class="{invalid: $v.confirmPassword.$error}"
                            class="input-text"
                            id="confirmPassword"
                            name="signup-pass-cf"
                            placeholder="Confirm password"
                            type="password"
                            v-model="confirmPassword"
                    />
                    <button class="btn btn-full" id="signup_submit" name="signup-submit" type="submit">Sign up</button>
                </form>
            </div>
            <div class="sign-up">
                <p>
                    Have a account?
                    <a @click="goLogin">Log in</a>
                </p>
            </div>
        </div>
        <div class="message message-error" v-show="error!='' ">
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
    import {confirmPassword, email, fullname, password, username} from "@/validate/validate";


    export default {
        data() {
            return {
                username: "",
                password: "",
                email: "",
                fullname: localStorage.getItem('fullname'),
                confirmPassword: "",
                error: ""
            };
        },

        validations: {
            password, confirmPassword, fullname, username, email
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
                                        console.log("login facebook error",err.response);
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
            }
            ,
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    let formData = {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        fullname: this.fullname
                    };
                    auth
                        .post("/signup", formData)
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
                                this.error = err.response.data.message;
                                setTimeout(() => this.error = '', 2000)
                            }
                        });
                }
            },

            update(userData) {
                this.email = userData.email;
                this.fullname = userData.fullname;
            },

            goLogin() {
                this.$router.push({name: "login"});
            }
        }
    };
</script>

<style scoped>
    .invalid {
        border-width: 2px;
        border-color: rgb(226, 35, 35);
    }
</style>