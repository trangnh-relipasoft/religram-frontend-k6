<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <a title="">Religram</a>
                <p class="slogan">Heaven in your hands</p>
            </div>
        </div>
        <div class="box-back box-back-v3">
            <a title="" v-if="state=='default'"><i aria-hidden="true" class="fa fa-times"></i></a>
            <a @click="handleBackOnClicked" v-if="state!='default'"><img alt class="fa fa-times"
                                                                         src="images/back-icon.png"/></a>
            <span v-if="mode==='post'">New post</span>
            <span v-else>Change Avatar</span>
            <a @click.prevent="handleAddPhotoOnClicked" class="" v-if="isSelected==false">
                <img alt class="center" src="images/footer-icon-plus.png"/>
            </a>
            <a @click="handleNextOnClicked" title="" v-else>Next</a>
        </div>
        <input @change="setImage"
               accept="image/*"
               name="image"
               ref="input"
               type="file"
               v-show="false"/>
        <div class="content">
            <div class="photo-upload">
                <div class="photo-img">
                    <vue-cropper :src="imgSrc"
                                 class="photo-img"
                                 preview=".preview"
                                 ref="cropper"/>
                    <!--                    <img :src="imgSrc" alt=""/>-->
                </div>

                <div class="photo-btn">
                    <a @click="state='filter'" class="btn" title="" v-if="state=='default'">Filter</a>
                    <a @click="state='edit'" class="btn" title="" v-if="state=='default'">Edit</a>
                    <a @click="cropImage" class="btn" id="crop" title="" v-if="state=='edit'">Crop</a>
                    <a @click="rotate(90)" class="btn" id="rotate" title="" v-if="state=='edit'">Rotate</a>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from '@/components/Footer'
    import VueCropper from 'vue-cropperjs';
    import axios_user from "@/axios/axios-user";

    export default {
        name: "UploadImage",
        components: {
            Footer, VueCropper
        },
        props: {
            mode: String
        },
        data() {
            return {
                state: 'default',
                imgSrc: '',
                cropImg: '',
                isSelected: false
            }
        },
        methods: {
            handleBackOnClicked() {
                this.state = 'default'

            },
            changeAvatar() {
                if (this.cropImg === '') {
                    this.cropImage()
                }
                let userData = {
                    avatar: this.cropImg.slice(21)
                };
                axios_user.post('', userData, {
                    headers: {
                        Authorization: 'Bearer ' + window.localStorage.getItem('token')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        let userData = {
                            avatar: res.data.user.avatar,
                        };
                        this.$store.commit('updateAvatar', userData)
                    }
                }).catch(reason => {
                    console.log(reason)
                });
                if (this.mode == 'avatar') {
                    this.$router.push({name: 'profile'})
                }
            },
            rotate(deg) {
                this.$refs.cropper.rotate(deg);
            },
            cropImage() {
                // get image data for post processing, e.g. upload or setting image src
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                this.imgSrc = this.cropImg
            },
            handleAddPhotoOnClicked() {
                this.showFileChooser();
            },
            handleNextOnClicked() {
                this.changeAvatar();
            },
            setImage(e) {
                const file = e.target.files[0];
                if (file.type.indexOf('image/') === -1) {
                    alert('Please select an image file');
                    return;
                }
                if (typeof FileReader === 'function') {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.imgSrc = event.target.result;
                        this.isSelected = true;
                        // rebuild cropperjs with the updated source
                        this.$refs.cropper.replace(event.target.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },
            showFileChooser() {
                this.$refs.input.click();
            },
        }
    }
</script>

<style scoped>
    /*#crop{*/
    /*    position: absolute;*/
    /*    bottom: 5%;*/
    /*    left: 10%;*/
    /*    width: 8%;*/
    /*    height: 4%;*/
    /*}*/
    /*#crop{*/
    /*    position: absolute;*/
    /*    bottom: 5%;*/
    /*    left: 90%;*/
    /*    width: 8%;*/
    /*    height: 4%;*/
    /*}*/
</style>