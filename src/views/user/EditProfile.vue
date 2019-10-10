<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <a href="#" title="">Religram</a>
                <p class="slogan">Heaven in your hands</p>
            </div>
        </div>
        <div class="content">
            <div class="profile">
                <div class="profile-header">
                    <div class="post-user">
                        <div class="post-avatar post-avatar-small">
                            <a href="#" title=""><img :src="avatar" alt=""/></a>
                        </div>
                        <div class="post-userName">
                            <p><a @click="usernameOnClicked" href="#" title="">{{constusername}}</a></p>
                            <p><a @click="handleChangeAvatar" class="btn-change-proflie btn" href="#" title="">Change
                                profile photo</a>
                                <a @click="handleChangePass" class="btn-change-pw btn" href="#" title="">
                                    Change password</a></p>
                        </div>
                    </div>
                </div>
                <div class="profile-content">
                    <div class="form form-change-profile">
                        <form @submit.prevent="onSubmit" class="change-profile">
                            <label>Name</label>
                            <input :class="{invalid: $v.fullname.$error}"
                                   :placeholder="fullname"
                                   @focusout="handleFocusOut(fullname, $event.target)"
                                   @input="handleFullnameInput($event.target.value)"
                                   id="change_profile_name" name="change-profile-name" onfocusin="this.placeholder=''"
                                   type="text"
                                   value="">
                            <div class="error" v-if="$v.fullname.$error">Name must be between
                                {{$v.fullname.$params.minLength.min}} and {{$v.fullname.$params.maxLength.max}}
                                characters.
                            </div>
                            <label>Username</label>
                            <input :class="{invalid: $v.username.$error}"
                                   :placeholder="username"
                                   @focusout="handleFocusOut(username, $event.target)"
                                   @input="handleUsernameInput($event.target.value)"
                                   id="change_profile_user"
                                   name="change-profile-user"
                                   onfocusin="this.placeholder=''" type="text" value="">
                            <label>Email</label>
                            <input :class="{invalid: $v.email.$error}"
                                   :placeholder="email"
                                   @focusout="handleFocusOut(email, $event.target)"
                                   @input="handleEmailInput($event.target.value)"
                                   id="change_profile_email"
                                   name="change-profile-email"
                                   onfocusin="this.placeholder=''" type="text" value="">
                            <button class="btn btn-full" id="change_profil_submit" name="change-profile-submit"
                                    type="submit">Submit
                            </button>
                        </form>
                    </div>
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
    </div>
</template>

<script>

    import {email, username, fullname} from "@/validate/validate";
    import axios_user from "@/axios/axios-user";

    export default {
        name: "EditUser",
        data() {
            return {
                constusername: localStorage.getItem('username'),
                username: localStorage.getItem('username'),
                fullname: localStorage.getItem('fullname'),
                email: localStorage.getItem('email'),
                avatar: localStorage.getItem('avatar'),
                isSuccess: false,
            }
        },
        validations: {
            email, username, fullname
        },
        methods: {
            usernameOnClicked() {
                this.$router.push({name: 'profile'})
            },
            handleFocusOut(key, target) {
                if (target.value === "") {
                    target.placeholder = key
                }
            },
            handleFullnameInput(value) {
                this.fullname = value;
                this.$v.fullname.$touch();
            },

            handleUsernameInput(value) {
                this.username = value;
                this.$v.username.$touch();
            },
            handleEmailInput(value) {
                this.email = value;
                this.$v.email.$touch();
            },
            handleChangeAvatar() {
                this.$router.push({name: 'changeavatar'})
            },
            handleChangePassword() {
                this.$router.push({name: 'changepassword'})
            },
            onSubmit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    let userData = {
                        username: this.username,
                        fullname: this.fullname,
                        email: this.email
                    };
                    axios_user.post('', userData, {
                        headers: {
                            Authorization: 'Bearer ' + window.localStorage.getItem('token')
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            this.isSuccess = true;
                            this.constusername = userData.username;
                            setTimeout(() => this.isSuccess = false, 2000);
                            this.$store.commit('updateUserInfo', userData)
                        }
                    }).catch(reason => {
                        console.log(reason)
                    });

                }
            }
        }
    }
</script>

<style scoped>
    .invalid {
        border-width: 2px;
        border-color: rgb(226, 35, 35);
    }
</style>