import axios from "axios";

const post = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + "/api/v1/post/post",
  timeout: 2000
});
post.defaults.headers.common["Authorization"] =
  "Bearer " + window.localStorage.getItem("token");

export default post;
