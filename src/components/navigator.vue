<template>
  <div id="navi">
    <div class="h">
      <div class="top">
        <div class="top-left">
          <div class="listIcon">
            <img src="../assets/list.svg" />
          </div>
          <div class="CrowdName">
            <span>ScutCrowd</span>
          </div>
        </div>
        <div class="search" :class="{ searchfocus: isSearchFocus }">
          <div class="icon">
            <img src="../assets/search_normal.svg" />
          </div>
          <input type="text" placeholder="搜索任务" @focus="searchFocus" @blur="searchBlur" />
          <div class="icon">
            <img src="../assets/advance_normal.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="left-item" tabindex="0" label="1" @focus="left1change(1)" @blur="left1change(0)">
          <img :src="left1img" />
          <span>任务招募</span>
        </div>
        <div class="left-item" tabindex="0" @focus="left2change(1)" @blur="left2change(0)">
          <img :src="left2img" style="margin: 0 18px" />
          <span>我的任务</span>
        </div>
        <div class="left-item" tabindex="0" @focus="left3change(1)" @blur="left3change(0)">
          <img :src="left3img" />
          <span>收藏任务</span>
        </div>
        <div class="left-item" tabindex="0" @focus="left4change(1)" @blur="left4change(0)">
          <img :src="left4img" />
          <span>历史任务</span>
        </div>
      </div>
      <div class="mid">
        <TaskItem v-for="(item, index) in this.taskinfo" :key="index" :taskinfo="item"
          @itemCollectChange="itemCollectChange"></TaskItem>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./taskitem";

export default {
  name: "navi",
  props: {},
  components: {
    TaskItem: TaskItem,
  },
  methods: {
    searchFocus() {
      this.searchBGC = "#f5f5f5";
      this.isSearchFocus = true;
    },
    searchBlur() {
      this.searchBGC = "#e5e5f0";
      this.isSearchFocus = false;
    },
    left1change(status) {
      console.log(status);
      switch (status) {
        case 0: {
          this.isleftFocus[0] = false;
          break;
        }
        case 1: {
          this.isleftFocus[0] = true;
        }
      }
    },
    left2change(status) {
      switch (status) {
        case 0: {
          this.isleftFocus[1] = false;
          break;
        }
        case 1: {
          this.isleftFocus[1] = true;
        }
      }
      console.log(this.isleftFocus[1]);
    },
    left3change(status) {
      switch (status) {
        case 0: {
          this.isleftFocus[2] = false;
          break;
        }
        case 1: {
          this.isleftFocus[2] = true;
        }
      }
    },
    left4change(status) {
      switch (status) {
        case 0: {
          this.isleftFocus[3] = false;
          break;
        }
        case 1: {
          this.isleftFocus[3] = true;
        }
      }
    },
    itemCollectChange(e) {
      let t = this.taskinfo.find((item) => {
        return item.id === e.i;
      })
      t.isCollect = e.v;
    },
  },
  computed: {
    left1img() {
      return require("../assets/task.svg");
    },
    left2img() {
      return !this.isleftFocus[1]
        ? require("../assets/self.svg")
        : require("../assets/self_focus.svg");
    },
    left3img() {
      return !this.isleftFocus[2]
        ? require("../assets/collect.svg")
        : require("../assets/collect_focus.svg");
    },
    left4img() {
      return !this.isleftFocus[3]
        ? require("../assets/history.svg")
        : require("../assets/history_focus.svg");
    },
  },
  data() {
    return {
      searchBGC: "#e5e5f0",
      isSearchFocus: false,
      isleftFocus: [true, false, false, false],
      icon1: "../assets/search_normal.svg",
      icon2: "../assets/advance_normal.svg",
      taskinfo: [
        {
          name: "originalmmm",
          place: "生活区体育场",
          time: "2022-12-31",
          taskbrief: "放置一个传感器",
          id: 0,
          isCollect: false,
        },
        {
          name: "originalmmm",
          place: "生活区体育场",
          time: "2022-12-31",
          taskbrief: "放置一个传感器",
          id: 1,
          isCollect: false,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navi {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 70px 0 0;
}

.h {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  margin: -70px 0 0;
}

.top {
  display: flex;
  padding: 10px 0;
}

.top-left {
  display: flex;
  width: 250px;
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
}

.right {
  width: 50px;
  display: flex;
}

.mid {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: auto;
  background-color: #f5f5f5;
  border-radius: 20px 20px 0 0;
}

.left {
  display: flex;
  flex-flow: column nowrap;
  width: 250px;
  height: auto;
}

.left-item {
  height: 36px;
  width: 90%;
  display: flex;
  align-items: center;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  font-size: 16px;
}

.left-item span {
  line-height: 36px;
  color: #515151;
}

.left-item img {
  margin: 0 20px;
}

.left-item:hover {
  background-color: #ddd;
}

.left-item:focus {
  background-color: #def;
  font-weight: 600;
}

.left-item span::before {
  content: "";
  width: 0;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.listIcon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.listIcon~div {
  height: 50px;
}

.listIcon img {
  height: 24px;
  width: auto;
}

.listIcon:hover {
  background-color: #d5d5d5;
  border-radius: 50%;
}

.CrowdName {
  display: flex;
  align-items: center;
  width: auto;
  font-size: 24px;
  color: #515151;
  margin-left: 10px;
}

.search {
  display: flex;
  background-color: v-bind(searchBGC);
  border-radius: 5px;
  transition: 0.3s;
}

.search input {
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 16px;
  width: 600px;
}

.searchfocus {
  box-shadow: 0 1px 2px 1px #aaa;
  transition: 0.3s;
}

.icon {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 10px;
}

.icon:hover {
  background-color: #d5d5d5;
  border-radius: 50%;
}

.tasks {
  display: flex;
  width: 100%;
  background-color: #222;
}
</style>
