<template>
    <div class="wrap">
        <div class="content">
            <div class="center">
                <input class="textfield" placeholder="Search" v-debounce="400" v-model.lazy="keywords"/>
            </div>
            <ul class="center">
                <li><a :class="{active:isUser}" @click="changeState">User</a></li>
                <li><a :class="{active:isHashtags}" @click="changeState">Hashtags</a></li>
            </ul>
            <div>
                <SearchResult :id="yourId"
                              :users="users"
                              :yourId="yourId"
                              @updateSearch="update" style="width: 90%; height: 90%">
                </SearchResult>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "@/components/Footer";
    import SearchResult from "@/components/User/SearchResult";
    import axios_user from "@/axios/axios-user";

    export default {
        name: "Search",
        components: {
            Footer, SearchResult
        },
        data() {
            return {
                keywords: '',
                users: [],
                isUser: true,
                isHashtags: false,
                yourId: localStorage.getItem('id'),
                currentPage: 0,
            }
        },
        watch: {
            keywords(after, before) {
                this.fetch();
            }
        },
        methods: {
            changeState() {
                this.isUser = !this.isUser;
                this.isHashtags = !this.isHashtags;
                this.fetch()
            },
            getFollowings() {
                axios_user.get(`/${this.id}/following`)
                    .then(res => {
                        this.followings = res.data;
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            },
            getFollowers() {
                axios_user
                    .get(`/${this.id}/follower`)
                    .then(res => {
                        this.users = res.data;
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            },
            getData() {
                axios_user
                    .get(`/${this.id}`)
                    .then(res => {
                        this.userData = res.data;
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            },
            update() {
                this.getData();
                this.getFollowers();
                this.getFollowings();
            },
            fetch() {
                let params = {page: this.currentPage};
                if (this.isUser) {
                    params = Object.assign(params, {user: this.keywords})
                } else {
                    params = Object.assign(params, {hashtag: this.keywords})
                }
                axios_user.post('/search', null, {
                    params: params
                }).then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        this.totalPage = response.data.totalPage;
                        this.users = response.data.list
                    }
                })
                    .catch(error => {
                        console.log(error)
                    });
            }
        }
    }
</script>

<style scoped>
    .active {
        background-color: #52a9eb !important;
    }

    .textfield {
        width: 90% !important;
        padding: 12px 10px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    ul {
        width: 90%;
        height: fit-content;
        list-style-type: none;
        padding: 0;
        margin: 10px auto 0 auto;
        background-color: #f1f1f1;
        overflow: hidden;
    }

    li {
        width: calc(50% - 1px);
        float: left;
    }

    li a {
        display: block;
        color: black;
        text-align: center;
        padding: 0 16px;
        text-decoration: none;
    }

    /* Change the link color on hover */
    li a:hover {
        background-color: #555;
        color: white;
    }
</style>