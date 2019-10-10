<template>

    <div class="wrap">
        <div class="header">
            <div class="logo">
                <a href="#" title="">Religram</a>
                <p class="slogan">Heaven in your hands</p>
            </div>
        </div>
        <div class="box-back box-back-v2">
            <a href="#" title=""><i aria-hidden="true" class="fa fa-angle-left"></i>Password change</a>
        </div>
        <div class="content">
            <div class="profile-header">
                <div class="post-user">
                    <div class="post-avatar post-avatar-small">
                        <a href="#" title=""><img alt="" src="images/image-thumb.jpg"/></a>
                    </div>
                    <div class="post-userName">
                        <p><a @click="usernameOnClicked" href="#" title="">{{username}}</a></p>
                    </div>
                </div>
            </div>
            <div class="profile-content">
                <div class="form form-change-pw">
                    <form @submit.prevent="onSubmit" action="" class="change-pw" method="">
                        <label>Current password</label>
                        <input class="input-text" id="change_pw_current" name="change-pw-current" placeholder=""
                               type="password"
                               v-model="currentPassword" value="">
                        <label>New password</label>
                        <input :class="{invalid: $v.password.$error}" id="change_pw_new" name="change-pw-new"
                               placeholder="" type="password"
                               v-model="password" value="">
                        <label>Confirm password</label>
                        <input :class="{invalid: $v.confirmPassword.$error}" id="change-pw-confirm"
                               name="change-pw-confirm" placeholder=""
                               type="password"
                               v-model="confirmPassword" value="">
                        <button class="btn btn-full" id="change_pw_submit" name="change-pw-submit" type="submit">Change
                            password
                        </button>
                        <p><a @click="handleForgotPasswordClicked" href="#" title="">Forgot password</a></p>
                    </form>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="post-event">
                <span class="icon-home"><a href="#" title=""><img alt="" src="images/footer-icon-home.png"/></a></span>
                <span class="icon-search"><a href="#" title=""><img alt=""
                                                                    src="images/footer-icon-search.png"/></a></span>
                <span class="icon-plus"><a href="#" title=""><img alt="" src="images/footer-icon-plus.png"/></a></span>
                <span class="post-icon-like"><a href="#" title=""></a></span>
                <span class="icon-my-page"><a href="#" title=""><img alt=""
                                                                     src="images/footer-icon-my-page.png"/></a></span>
            </div>
        </div>
        <div class="message message-success" v-if="isSuccess">
            <p>Save successfuly!</p>
        </div>
        <div class="message message-error" v-show="error != ''">
            <p>{{error}}</p>
        </div>
    </div>

</template>

<script>
    import {confirmPassword, password} from "@/validate/validate";
    import auth from "@/axios/axios-auth";

    export default {
        name: "ChangePassword",
        data() {
            return {
                username: localStorage.getItem('username'),
                isSuccess: false,
                currentPassword: '',
                password: '',
                confirmPassword: '',
                error: ''
            }
        },
        validations: {
            password, confirmPassword
        },
        methods: {
            handleForgotPasswordClicked() {
                this.$router.push({name: 'forgotpassword'})
            },
            usernameOnClicked() {
                this.$router.push({name: 'profile'})
            },
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    let userData = {
                        currentPassword: this.currentPassword,
                        newPassword: this.password,
                    };
                    auth.post('changepassword', userData, {
                        headers: {
                            Authorization: 'Bearer ' + window.localStorage.getItem('token')
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            this.isSuccess = true;
                            setTimeout(() => this.isSuccess = false, 2000);
                            this.$store.dispatch("clearAuth");
                            this.$router.push({name: 'login'})
                        }
                    }).catch(err => {
                        if (err) {
                            this.error = err.response.data.message;
                            setTimeout(() => this.error = "", 2000)
                        }
                    });
                }
            },

        }
    }
</script>

<style scoped>
    .invalid {
        border-width: 2px;
        border-color: rgb(226, 35, 35);
    }
</style>