<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <a href title>Religram</a>
                <p class="slogan">Heaven in your hands</p>
            </div>
        </div>
        <div class="content">
            <div class="form form-forgot-pw">
                <p class="center">
                    <img alt src="images/icon-lock.png"/>
                </p>
                <h3 class="center">Trouble Logging In?</h3>
                <p
                        class="center"
                >Enter your username or email and we'll send you a link to get back into account.</p>
                <form @submit.prevent="onSubmit" id="form_forgot_pw">
                    <input
                            :class="{invalid: $v.email.$error}"
                            class="input-text"
                            id="email"
                            name="fpw-email-fb"
                            placeholder="Email or username"
                            type="text"
                            v-model="email"
                    />
                    <button class="btn btn-full" id="fpw_submit" name="fpw-submit-fb" type="submit">Submit</button>
                </form>
                <div class="label-break">
                    <span>or</span>
                </div>
            </div>
            <div class="sign-up">
                <p>
                    <a @click="$router.push({name: 'signup'})" href title>Creat New Account</a>
                </p>
            </div>
            <div class="box-back">
                <a @click="$router.push({name: 'login'})" href title>Back to log in</a>
            </div>
        </div>
        <div class="message message-error" v-show="error != ''">
            <p>{{error}}</p>
        </div>
    </div>
</template>

<script>
    import auth from "../../axios/axios-auth";
    import {email} from "@/validate/validate";

    export default {
        data() {
            return {
                email: "",
                error: "",
                isError: false
            };
        },

        validations: {
            email
        },

        created() {
            this.isError = this.$route.query.isError;
            if (this.isError) {
                this.error =
                    "It looks like you clicked on an invalid password reset link. Please try again.";
                setTimeout(() => this.error = '', 2000)
            }
        },

        methods: {
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    auth
                        .post("/resetpassword", {email: this.email})
                        .then(res => {
                            if (res.status == 200) {
                                this.$router.push({name: "forgotpasswordsuccess"});
                            }
                        })
                        .catch(err => {
                            if (err) {
                                this.error = err.response.data.message;
                            }
                        });
                }
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