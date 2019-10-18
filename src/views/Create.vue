<template>
  <div class="wrap">
    <div class="box-back box-back-v3">
      <a href="#" title>
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>
      <span>New post</span>
      <a href="photo-upload-post.html" title>Next</a>
    </div>
    <div style="height: 303px; position: relative" v-show="isEdit">
      <croppa
        v-model="croppa"
        :width="413"
        :height="height"
        :prevent-white-space="true"
        :disable-drag-and-drop="true"
        :disable-click-to-choose="false"
        :show-remove-button="false"
      >
        <img crossorigin="anonymous" :src="imageUrl" slot="initial" />
      </croppa>

      <img src="../../public/images/resize.png" id="resize" @click="resize" />
      <img src="../../public/images/rotate.png" id="rotate" @click="rotate" />
    </div>
    <div style="width:413px;height: 303px; position: relative" v-show="isFilter">
      <img :src="dataUrl" />
    </div>

    <div style="height: 200px"></div>
    <div class="photo-btn">
      <button :class="{btn:true, active:isFilter}" @click="goFilter">Filter</button>
      <button :class="{btn:true, active:isEdit}" @click="goEdit">Edit</button>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.imageUrl = this.$route.query.pic.imageUrl;

    setTimeout(() => {
      console.log("");
    }, 500);
  },
  data() {
    return {
      imageUrl: null,
      croppa: {},
      height: 303,
      isEdit: true,
      isFilter: false,
      dataUrl: ""
    };
  },
  methods: {
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
    }
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
img {
  -webkit-filter: grayscale(100%) !important; /* Safari 6.0 - 9.0 */
  filter: grayscale(100%) !important;
}
</style>
