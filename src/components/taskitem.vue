<template>
  <div class="task-item">
    <div class="task-item-name">
      <span style="font-weight: 600; width: 30px; font-size: 16px;margin: 0 15px;" :style="this.color">{{ idx }}</span>
      <span style="font-weight: 600;">{{ taskinfo.name }}</span>
    </div>
    <div class="task-item-intro">
      <span>{{ taskinfo.title }}</span>
      <span style="margin-left: 30px;">{{ score }}</span>
    </div>
    <div class="task-item-time">
      <span>{{ taskinfo.time }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "taskItem",
  props: ["taskinfo", "idx"],
  computed: {
    collectImage() {
      return this.taskinfo.pos_score > 0 ? require('../assets/hot1.svg') : require('../assets/warn1.svg')
    },
    score(){
      let score = this.taskinfo.pos_score > 0 ? this.taskinfo.pos_score: this.taskinfo.neg_score
      let str = this.taskinfo.pos_score > 0 ? '乐观分数：': '悲观分数：'
      score = str + Math.round(Math.abs(score)*20 - 10).toString()
      return score;
    },
    color(){
      if(this.idx <4) return {'color': 'red'};
      else if(this.idx < 11 ) return {'color': '#AF6D77'};
      else return {'color': '#2c2c2c'}
    }
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
  height: 48px;
  display: flex;
  flex-shrink: 0;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #d5d5d5;
  font-size: 14px;
  flex-wrap: wrap;
}

.task-item:hover {
  box-shadow: 0 1px 2px 0 #2c2c2c;
}

.task-item-name {
  width: 150px;
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
