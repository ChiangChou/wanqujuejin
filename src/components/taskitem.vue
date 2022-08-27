<template>
  <div class="task-item">
    <div class="task-item-name">
      <img :src="collectImage" @click="collectChange" />
      <span>{{ taskinfo.name }}</span>
    </div>
    <div class="task-item-intro">
      <span>{{ taskinfo.taskbrief }}</span>
      <span>{{ taskinfo.place }}</span>
    </div>
    <div class="task-item-time">
      <span>{{ taskinfo.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "taskItem",
  props: ["taskinfo"],
  computed: {
    collectImage() {
      return this.taskinfo.isCollect ? require('../assets/collect_gold.svg') : require('../assets/collect_light.svg')
    },
  },
  methods: {
    collectChange() {
      this.$emit("itemCollectChange", {v: !this.taskinfo.isCollect, i: this.taskinfo.id});
    },    
  },
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-item {
  width: 100%;
  height: 36px;
  display: flex;
  flex-shrink: 0;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #d5d5d5;
  font-size: 14px;
  flex-wrap: wrap;
}

.task-item:hover {
  box-shadow: 0 1px 2px 0 #aaa;
}

.task-item-name {
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
}

.task-item-name img {
  width: 18px;
  height: 18px;
  background-color: transparent;
  border-radius: 16px;
  padding: 7px;
  margin: 0 5px;
}

.task-item-name img:hover {
  background-color: #e0e0e0;
}

.task-item-intro {
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
}

.task-item-intro span:first-child {
  width: 60%;
}

.task-item-time {
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
