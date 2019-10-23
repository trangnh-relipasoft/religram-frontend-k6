<template>
    <div class="wrap">
        <div class="box-back box-back-v3">
            <a title=""><i @click="handleCancelOnClicked" aria-hidden="true"
                           class="fa fa-times " style="cursor: pointer"></i></a>
            <span v-if="mode==='post'">New post</span>
            <span v-else>Change Avatar</span>
            <a @click="handleNextOnClicked" title="">Next</a>
        </div>
        <div style="height: 303px; position: relative" v-show="isEdit">
            <croppa
                    :disable-click-to-choose="false"
                    :disable-drag-and-drop="true"
                    :height="height"
                    :prevent-white-space="true"
                    :show-remove-button="false"
                    :width="413"
                    v-model="croppa"
            >
                <img :src="imageUrl" crossorigin="anonymous" slot="initial"/>
            </croppa>

            <img @click="resize" id="resize" src="../../public/images/resize.png"/>
            <img @click="rotate" id="rotate" src="../../public/images/rotate.png"/>
        </div>
        <div style="width:413px;height: 303px; position: relative" v-show="isFilter">
            <img :src="dataUrl" :style='filters'>
        </div>

        <div style="height: 200px">
            <br><br><br>
            <div class="siema">
                <div :key="preset.index" @click='selectAndLoadPreset(preset)' class="center"
                     v-for='preset in presets()'>
                    <div style="height: 80px" v-show="isFilter">
                        <img :src="dataUrl" :style='makeFilter(preset.filterSet)' class='filterimg'
                             crossOrigin="Anonymous" style="padding: 5%">
                    </div>
                    <small v-show="isFilter">{{ preset.name }}</small>
                </div>
            </div>
        </div>
        <div class="photo-btn">
            <button :class="{btn:true, active:isFilter}" @click="goFilter">Filter</button>
            <button :class="{btn:true, active:isEdit}" @click="goEdit">Edit</button>
        </div>
    </div>
</template>
<script>
    import Siema from 'siema';
    import axios_user from "@/axios/axios-user";

    export default {
        components: {},
        mounted() {
            this.mySiema = new Siema({
                perPage: 4
            })
        },
        created() {
            this.imageUrl = this.$route.query.pic.imageUrl;
            setTimeout(() => {
                console.log("");
            }, 500);
        },
        props: [
            'mode'
        ],
        data() {
            return {
                imageUrl: null,
                croppa: {},
                height: 303,
                width: 413,
                isEdit: true,
                isFilter: false,
                dataUrl: "",
                filterFunctions: null,
                selectedPreset: null,
            };
        },
        computed: {
            filters() {
                return this.makeFilter();
            }
        },
        methods: {
            handleNextOnClicked() {
                this.getFilteredImage();
                this.submit();
            },
            async getFilteredImage() {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                const ctx = canvas.getContext('2d');
                ctx.filter = this.filters.filter;
                var img = new Image();
                img.src = this.dataUrl;
                await this.draw(img, ctx, canvas);
            },
            draw(img, ctx, canvas){
                return new Promise((resolve, reject) => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const anchor = document.createElement('a');
                    anchor.href = canvas.toDataURL("image/png");
                    localStorage.setItem('avatar_base64_str', anchor.href)
                })
            },
            submit(){
                var tmp = localStorage.getItem('avatar_base64_str');
                console.log("tmp", tmp);
                let userData = {
                    avatar: tmp.slice(21)
                };
                localStorage.removeItem("avatar_base64_str");
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
                        if (this.mode === 'avatar') {
                            this.$router.push({name: 'profile'})
                            this.$router.push({name: 'profile'})
                        }
                    }
                }).catch(reason => {
                    console.log(reason)
                });
            },
            handleCancelOnClicked() {
                if (this.mode === 'avatar') {
                    this.$router.push({name: 'profile'})
                } else {
                    this.$router.push({name: 'home'})
                }
            },
            rotate() {
                this.croppa.rotate();
            },
            resize() {
                if (this.height == 303) this.height = 250;
                else this.height = 303;
            },
            goFilter() {
                this.dataUrl = this.croppa.generateDataUrl("image/jpeg");
                this.isFilter = true;
                this.isEdit = false;
            },
            goEdit() {
                this.isFilter = false;
                this.isEdit = true;
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
        }
    };
</script>
<style scoped>
    #rotate {
        width: 22px;
        height: 22px;
        position: absolute;
        bottom: 2%;
        right: 2%;
        border-radius: 2px;
        color: white;
        background-color: white;
        cursor: pointer;
    }

    #rotate:hover {
        background-color: rgb(188, 192, 196);
    }

    #resize {
        width: 22px;
        height: 22px;
        position: absolute;
        bottom: 2%;
        left: 2%;
        border-radius: 2px;
        color: white;
        background-color: white;
        cursor: pointer;
    }

    #resize:hover {
        background-color: rgb(188, 192, 196);
    }

    .btn {
        background-color: rgb(229, 229, 240);
        color: black !important;
        border-radius: 15px;
    }

    .active {
        background-color: rgb(183, 183, 204);
    }

    .filterimg {
        width: 80px !important;
        height: 80px !important;
        object-fit: cover;
        max-width: 150px !important;
        cursor: pointer;
    }
</style>
