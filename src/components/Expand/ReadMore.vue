<template>
  <div>
    <div v-if="isTooLong || isTooManyLine" @click="isExpand = !isExpand">
      <div v-if="isExpand == false">
        <p v-if="isTooLong">{{text.slice(0,this.maxLength-1)}}</p>
        <p v-else-if="isTooManyLine">{{textIfTooManyLine}}</p>
        <p id="readmore" @click.stop="isExpand = !isExpand">... more</p>
      </div>
      <div v-else>
        <p>{{text}}</p>
      </div>
    </div>

    <div v-else>
      <p>{{text}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
    maxLength: {
      default: 300,
      type: Number
    },
    maxLine: {
      default: 5,
      type: Number
    }
  },

  data() {
    return {
      lineCount: this.text.length ? this.text.split(/\r\n|\r|\n/).length : 0,
      pathText: this.text.split(/\r\n|\r|\n/),
      isTooLong: false,
      isTooManyLine: false,
      textIfTooManyLine: "",
      isExpand: false
    };
  },
  created() {
    if (this.text.length > this.maxLength) this.isTooLong = true;
    else if (this.lineCount > this.maxLine) {
      this.isTooManyLine = true;
      for (let i = 0; i < this.maxLine - 1; i++)
        this.textIfTooManyLine =
          this.textIfTooManyLine + this.pathText[i] + "\n";
    }
  }
};
</script>

<style scoped>
p {
  font-family: "Roboto", sans-serif;
  white-space: pre-line;
  color: rgb(48, 46, 46);
  font-weight: normal;
  display: inline;
  cursor: default;
}
#readmore {
  color: rgb(74, 116, 207);
  cursor: pointer;
}

#readmore:hover {
  color: rgb(16, 112, 156);
}
</style>