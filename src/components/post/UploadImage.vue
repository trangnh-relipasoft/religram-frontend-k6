<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <a title="">Religram</a>
                <p class="slogan">Heaven in your hands</p>
            </div>
        </div>
        <div class="box-back box-back-v3">
            <a title=""><i @click="handleCancelOnClicked" aria-hidden="true"
                           class="fa fa-times " style="cursor: pointer"></i></a>
            <span v-if="mode==='post'">New post</span>
            <span v-else>Change Avatar</span>
            <a @click.prevent="handleAddPhotoOnClicked" class="" v-if="isSelected==false">
                <img alt class="center" role="button" src="images/footer-icon-plus.png" style="cursor: pointer"/>
            </a>
            <a @click="handleNextOnClicked" title="" v-else>Next</a>
        </div>
        <input @change="setImage"
               accept="image/*"
               name="image"
               ref="input"
               type="file"/>
        <div class="content">
            <div class="photo-upload">
                <template class="photo-img" v-if="state==='edit'">
                    <vue-cropper :autoCrop="true" :autoCropArea="1" :cropBoxResizable="false"
                                 :src="tmpImg"
                                 :viewMode="3"
                                 :zoomable="true"
                                 class="photo-img"
                                 preview=".preview"
                                 ref="cropper"
                    />
                </template>

                <div class='photo-img' v-if="state=='filter' || state == 'default'">
                    <img :src="imgSrc" :style='filters'>
                </div>

                <div style="height: 100px">
                    <div class="siema">
                        <div :key="preset.index" @click='selectAndLoadPreset(preset)' class="center"
                             v-for='preset in presets()'>
                            <div style="height: 80px" v-if="state==='filter'">
                                <img :src="imgSrc" :style='makeFilter(preset.filterSet)' class='filterimg'
                                     crossOrigin="Anonymous" style="padding: 5%">
                            </div>
                            <small v-if="state=='filter'">{{ preset.name }}</small>
                        </div>
                    </div>
                    <div class="center" style="margin: 20% auto 20% auto">
                        <a title v-if="state==='edit'">
                            <img @click="rotate(90)" alt src="images/refresh.png"/>
                        </a>
                    </div>
                </div>

                <div class="photo-btn">
                    <a @click="handleFilterOnClicked" class="btn" title="">Filter</a>
                    <a @click="state='edit'" class="btn" title="">Edit</a>
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
    import 'cropperjs/dist/cropper.css';
    import DefaultImage from '/home/ddragon/vuejs-css3-image-filter/src/assets/default.jpg'
    import Siema from 'siema';

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
                tmpImg: '',
                imgSrc: '',
                cropImg: '',
                isSelected: false,

                image: null,
                filterFunctions: null,
                width: 0,
                height: 0,
                selectedPreset: null,
                textCopied: false,

            }
        },
        methods: {
            handleFilterOnClicked() {
                if (this.state == 'edit') {
                    this.cropImage()
                }
                this.state = 'filter'
            },
            handleCancelOnClicked() {
                if (this.mode === 'avatar') {
                    this.$router.push({name: 'profile'})
                } else if (this.mode === 'post') {
                    this.$router.push({name: 'home'})
                }
                this.$router.push({name: 'home'})
            },
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
                        this.$store.commit('updateAvatar', userData);
                        if (this.mode == 'avatar') {
                            this.$router.push({name: 'profile'})
                        }
                    }
                }).catch(reason => {
                    console.log(reason)
                });
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

            makeFilter(filterSet) {
                if (!filterSet) {
                    filterSet = this.filterFunctions;
                }
                var filterString = "";
                var defaultValues = this.defaultValues();
                for (var filterFunc in filterSet) {
                    if (filterSet[filterFunc] !== defaultValues[filterFunc]) {
                        if (filterFunc == 'hueRotate') {
                            filterString = filterString + "hue-rotate(" + filterSet[filterFunc] + "deg) ";
                        } else if (filterFunc == 'blur') {
                            filterString = filterString + filterFunc + "(" + filterSet[filterFunc] + "px) ";
                        } else {
                            filterString = filterString + filterFunc + "(" + filterSet[filterFunc] + ") ";
                        }
                    }
                }

                return {filter: filterString};
            },
            setToDefault() {
                this.filterFunctions = this.defaultValues();
            },
            defaultValues() {
                return {
                    grayscale: 0,
                    sepia: 0,
                    saturate: 1,
                    hueRotate: 0,
                    invert: 0,
                    brightness: 1,
                    contrast: 1,
                    blur: 0,
                    opacity: 1
                }
            },
            loadImage(file) {
                var reader = new FileReader();
                var image = new Image();

                reader.onload = (e) => {
                    this.image = e.target.result;
                    this.tmpImg = this.image
                    image.src = e.target.result;
                };
                reader.readAsDataURL(file);
                image.onload = function () {
                    document.getElementById("image").setAttribute("data-original-width", this.width);
                    document.getElementById("image").setAttribute("data-original-height", this.height);
                }
            },
            presets() {
                return {
                    brannes: {name: 'Brannes', filterSet: {sepia: 0.5, contrast: 1.4}},
                    inkwell: {name: 'Inkwell', filterSet: {sepia: 0.3, contrast: 1.1, brightness: 1.1, grayscale: 1}},
                    lofi: {name: 'Lo-Fi', filterSet: {saturate: 1.1, contrast: 1.5}},
                    moon: {name: 'Moon', filterSet: {grayscale: 1, contrast: 1.1, brightness: 1.1}},
                    nashville: {
                        name: 'Nashville',
                        filterSet: {sepia: 0.2, contrast: 1.2, brightness: 1.05, saturate: 1.2}
                    },
                    toaster: {name: 'Toaster', filterSet: {contrast: 1.5, brightness: 0.9}},
                    walden: {name: 'Walden', filterSet: {brightness: 1.1, hueRotate: '-10', sepia: .3, saturate: 1.6}},
                    willow: {name: 'Willow', filterSet: {grayscale: 0.5, contrast: 0.95, brightness: 0.9}},
                    xpro2: {name: 'X-pro II', filterSet: {sepia: 0.3}},
                }
            },
            selectAndLoadPreset(preset) {
                if (preset) {
                    this.filterFunctions = preset.filterSet;
                    this.selectedPreset = preset;
                }
            },
            download() {
                const canvas = document.createElement('canvas');
                canvas.width = document.getElementById("image").getAttribute("data-original-width");
                canvas.height = document.getElementById("image").getAttribute("data-original-height");

                const ctx = canvas.getContext('2d');
                ctx.filter = this.filters.filter;

                var img = new Image();
                img.src = this.image;
                img.onload = function () {
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                    const anchor = document.createElement('a');
                    anchor.href = canvas.toDataURL();
                    anchor.download = 'filtered.png';
                    anchor.click();
                };
            },
            defaultImage() {
                return DefaultImage;
            }
        },
        computed: {
            filters() {
                return this.makeFilter();
            }
        },
        created() {
            this.imgSrc = this.defaultImage();
            this.tmpImg = this.imgSrc
            this.filterFunctions = this.defaultValues();
        },
        mounted() {
            this.mySiema = new Siema({
                perPage: 4
            })
        }
    }
</script>

<style scoped>
    input[type="file"] {
        display: none;
    }

    .filterimg {
        width: 80px !important;
        height: 80px !important;
        object-fit: cover;
        max-width: 150px !important;
    }
</style>