<template>
    <div>
        <input
                @change="setImage"
                accept="image/*"
                name="image"
                ref="input"
                type="file"/>

        <div class="content">
            <section class="cropper-area">
                <div class="img-cropper" style="width: 200px; height: 100px">
                    <vue-cropper
                            :aspect-ratio="1 / 1"
                            :src="imgSrc"
                            preview=".preview"
                            ref="cropper"
                    />
                </div>
            </section>
            <section>
                <div class="actions">
                    <a
                            @click.prevent="zoom(0.2)"
                            href=""
                            role="button"
                    >
                        Zoom In
                    </a>
                    <a
                            @click.prevent="zoom(-0.2)"
                            href=""
                            role="button"
                    >
                        Zoom Out
                    </a>
                    <a
                            @click.prevent="rotate(90)"
                            href=""
                            role="button"
                    >
                        Rotate +90
                    </a>
                    <a
                            @click.prevent="rotate(-90)"
                            href=""
                            role="button"
                    >
                        Rotate -90
                    </a>
                    <a
                            @click.prevent="cropImage"
                            href=""
                            role="button"
                    >
                        Crop
                    </a>
                    <a
                            @click.prevent="showFileChooser"
                            href=""
                            role="button"
                    >
                        Choose Image
                    </a>
                    <a
                            @click.prevent="changeAvatar"
                            href=""
                            role="button">
                        Change Avatar
                    </a>
                    <br><br><br><br><br><br>
                </div>
            </section>


        </div>
    </div>

</template>

<script>
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';
    import axios_user from "@/axios/axios-user";

    export default {
        components: {
            VueCropper,
        },
        props: {
            mode: String
        },
        data() {
            return {
                imgSrc: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjXoomPuZHlAhUHHXAKHX2SBekQjRx6BAgBEAQ&url=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&psig=AOvVaw3zLXqfvPb2o-u8LO_f9DyL&ust=1570788451114226',
                cropImg: '',
                data: null,
            };
        },
        methods: {
            changeAvatar() {
                if (this.cropImg === '') {
                    this.cropImage()
                }
                let userData = {
                    avatar: this.cropImg
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
                this.$emit('close')
            },
            cropImage() {
                // get image data for post processing, e.g. upload or setting image src
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                this.imgSrc = this.cropImg

            },
            flipX() {
                const dom = this.$refs.flipX;
                let scale = dom.getAttribute('data-scale');
                scale = scale ? -scale : -1;
                this.$refs.cropper.scaleX(scale);
                dom.setAttribute('data-scale', scale);
            },
            flipY() {
                const dom = this.$refs.flipY;
                let scale = dom.getAttribute('data-scale');
                scale = scale ? -scale : -1;
                this.$refs.cropper.scaleY(scale);
                dom.setAttribute('data-scale', scale);
            },
            getCropBoxData() {
                this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
            },
            getData() {
                this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
            },
            move(offsetX, offsetY) {
                this.$refs.cropper.move(offsetX, offsetY);
            },
            reset() {
                this.$refs.cropper.reset();
            },
            rotate(deg) {
                this.$refs.cropper.rotate(deg);
            },
            setCropBoxData() {
                if (!this.data) return;

                this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
            },
            setData() {
                if (!this.data) return;
                this.$refs.cropper.setData(JSON.parse(this.data));
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
            zoom(percent) {
                this.$refs.cropper.relativeZoom(percent);
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        font-family: Arial, Helvetica, sans-serif;
        width: 1024px;
        margin: 0 auto;
    }

    input[type="file"] {
        display: none;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0 5px 0;
    }

    .header h2 {
        margin: 0;
    }

    .header a {
        text-decoration: none;
        color: black;
    }

    .content {
        display: flex;
        justify-content: space-between;
    }

    .cropper-area {
        width: 414px;
    }

    .actions {
        margin-top: 1rem;
    }

    .actions a {
        width: 150px;
        display: inline-block;
        padding: 5px 15px;
        background: #0062CC;
        color: white;
        text-decoration: none;
        border-radius: 2px;
        margin-right: 1rem;
        margin-bottom: 1rem;
    }

    textarea {
        width: 100%;
        height: 100px;
    }

    .preview-area {
        width: 307px;
    }

    .preview-area p {
        font-size: 1.25rem;
        margin: 0;
        margin-bottom: 1rem;
    }

    .preview-area p:last-of-type {
        margin-top: 1rem;
    }

    .preview {
        width: 100%;
        height: calc(372px * (9 / 16));
        overflow: hidden;
    }

    .crop-placeholder {
        width: 100%;
        height: 200px;
        background: #ccc;
    }

    .cropped-image img {
        max-width: 100%;
    }
</style>
