<template>
  <div class="wrap">
    <p class="activity-header">Activity</p>
    <hr />
    <div v-for="(message,index) in messages" :key="index">
      <activityItem :message="message"></activityItem>
      <hr />
    </div>
    <footers key="footeractivity"></footers>
  </div>
</template>
<script>
import ActivityItem from "@/components/Activity/ActivityItem";
import Footers from "@/components/Footer";
export default {
  components: {
    ActivityItem,
    Footers
  },
  data() {
    return {
      messages: []
    };
  },

  created() {
    this.fetchMessages();
  },

  methods: {
    fetchMessages() {
      db.collection(localStorage.getItem("id"))
        .orderBy("createAt")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              this.messages.unshift(change.doc.data());
              this.$emit("here");
            }
          });
        });
    }
  }
};
</script>
<style scoped>
.activity-header {
  text-align: center;
  font-weight: 200;
  font-size: 22px;
}
#image {
  display: inline-block;
  width: 40px;
  height: 40px;
  /* margin-top: -3px; */
  margin-left: 5px;
  margin-bottom: 5px;
}
#image img {
  max-width: 100%;
  max-height: 100%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-left: 10px;
}

.activity-text {
  margin-left: 10px;
  margin-top: 8px;
  font-size: 18px;
  position: absolute;
  top: 17%;
  left: 50px;
}
</style>