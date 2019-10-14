<template>
  <div class="wrap">
    <div class="content">
      <div class="form form-reset-pw">
        <form @submit.prevent="onSubmit" id="form_reset_pw">
          <label>New password</label>
          <input
            :class="{invalid: $v.password.$error}"
            class="input-text"
            id="password"
            name="reset-pw"
            placeholder="New password"
            type="password"
            v-model="password"
          />
          <label>Confirm password</label>
          <input
            :class="{invalid: $v.confirmPassword.$error}"
            class="input-text"
            id="confirmPassword"
            name="reset-pw-cf"
            placeholder="Confirm password"
            type="password"
            v-model="confirmPassword"
          />
          <button
            class="btn btn-full"
            id="reset_pw_submit"
            name="reset-pw-submit"
            type="submit"
          >Reset password</button>
        </form>
      </div>
    </div>
    <div class="message message-success" v-show="isOk">
      <p>Reset successfully!</p>
    </div>
  </div>
</template>

<script>
import auth from "../../axios/axios-auth";
import { confirmPassword, password } from "@/validate/validate";

export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      isOk: false
    };
  },
  validations: {
    password,
    confirmPassword
  },

  created() {},

  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        auth
          .post(
            "/resetpass",
            {
              newPass: this.password,
              confirmPass: this.confirmPassword
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          )
          .then(res => {
            if (res.status == 200) {
              this.isOk = true;
              setTimeout(() => {
                this.$router.push({ name: "login" });
              }, 1000);
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