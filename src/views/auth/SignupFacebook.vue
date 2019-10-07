<template>
  <div class="wrap">
    <div class="header">
      <div class="logo">
        <a href="#" title>Religram</a>
        <p class="slogan">Heaven in your hands</p>
      </div>
    </div>
    <div class="content">
      <div class="form form-sign-up-fb">
        <form id="form_sign_up_fb" @submit.prevent="getBase64">
          <div class="sign-up-avatar">
            <p>
              <img :src="avatar" alt />
            </p>
          </div>
          <input
            :class="{invalid: $v.email.$error}"
            class="input-text"
            id="email"
            name="signup-email-fb"
            placeholder="Email"
            type="text"
            v-model="email"
            value
          />
          <input
            :class="{invalid: $v.fullname.$error}"
            class="input-text"
            id="fullname"
            name="signup-name-fb"
            placeholder="Fullname"
            type="text"
            v-model="fullname"
            value
          />
          <input
            :class="{invalid: $v.username.$error}"
            class="input-text"
            id="username"
            name="signup-user-fb"
            placeholder="Username"
            type="text"
            v-model="username"
            value
          />
          <input
            :class="{invalid: $v.password.$error}"
            class="input-text"
            id="password"
            name="signup-pass-fb"
            placeholder="Password"
            type="password"
            v-model="password"
            value
          />
          <button
            type="submit"
            class="btn btn-full"
            id="signup_submit_fb"
            name="signup-submit-fb"
          >Sign up</button>
        </form>
      </div>
      <div class="sign-up">
        <p>
          Have a account?
          <a href="#" title>Log in</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { email, fullname, password, username } from "@/validate/validate";
import auth from "../../axios/axios-auth";
import image2base64 from "image-to-base64";

export default {
  name: "SignupFacebook",
  data() {
    return {
      username: "",
      fullname: localStorage.getItem("fullname"),
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar"),
      password: "",
      avatar2: String
    };
  },
  validations: {
    email,
    fullname,
    username,
    password
  },
  methods: {
    getBase64() {
      image2base64(this.avatar)
        .then(res => {
          this.avatar2 = res;
          this.signupfacebook();
        })
        .catch(error => {
          if (error) {
            console.log(error);
          }
        });
    },
    signupfacebook() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let formData = {
          username: this.username,
          email: this.email,
          password: this.password,
          fullname: this.fullname,
          avatar: this.avatar2
        };
        console.log("done");
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
                avatar: res.data.user.avatar
              };
              this.$store.dispatch("authUser", userData);
              this.$router.push({ name: "home" });
            }
          })
          .catch(err => {
            if (err) {
              this.error = err.response.data.message;
              setTimeout(() => (this.error = ""), 2000);
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