import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/auth/Login";
import Signup from "@/views/auth/Signup";
import SignupFacebook from "@/views/auth/SignupFacebook";
import ForgotPassword from "@/views/auth/ForgotPassword";
import ForgotPasswordSuccess from "@/views/auth/ForgotPasswordSuccess";
import ResetPassword from "@/views/auth/ResetPassword";
import EditProfile from "@/views/user/EditProfile";
import ChangePassword from "@/views/user/ChangePassword";
import VerifyToken from "@/views/auth/VerifyToken";
import OtherProfile from "@/views/user/OtherProfile";
import Profile from "@/views/user/Profile";
import PostDetail from "@/views/PostDetail/PostDetail";
import Create from "@/views/Create";
import Activity from "@/views/Activity";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },

    {
      path: "/signupfacebook",
      name: "signupfacebook",
      component: SignupFacebook
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: ForgotPassword
    },

    {
      path: "/forgotpasswordsuccess",
      name: "forgotpasswordsuccess",
      component: ForgotPasswordSuccess
    },
    {
      path: "/resetpassword",
      name: "resetpassword",
      component: ResetPassword
    },
    {
      path: "/editprofile",
      name: "editprofile",
      component: EditProfile
    },
    {
      path: "/changepassword",
      name: "changepassword",
      component: ChangePassword
    },
    {
      path: "/verify",
      name: "verify",
      component: VerifyToken
    },
    {
      path: "/user",
      name: "otherprofile",
      component: OtherProfile
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/post",
      name: "postdetail",
      component: PostDetail
    },
    {
      path: "/create",
      name: "create",
      component: Create,
      props: true
    },
    {
      path: "/activity",
      name: "activity",
      component: Activity
    }
  ]
});
