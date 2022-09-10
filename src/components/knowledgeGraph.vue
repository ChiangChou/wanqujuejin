<template>
  <div class="flex" style="width: 100%; height:calc(100vh - 360px)">
    <!--<loading v-if="this.loading"></loading>-->
    <div class="mid-main" id="main"></div>
    <div class="mid-main" style="width: 50%; height:100%; background-color: #fff;">
      <knowledge></knowledge>
    </div>
  </div>
</template>
<style>

</style>
<script>
import * as echarts from 'echarts'
import loading from './loading.vue'
import knowledge from './knowledge1.vue'

export default {
  name: "App",
  components: {
    loading: loading,
    knowledge: knowledge,
  },
  data() {
    return {
      loading: true,
      data: [],
      link: [],
    }
  },
  created() {

  },
  mounted() {
    this.request();
  },

  methods: {
    request() {
      let industryBasic = res => {
        let temp = JSON.parse(res)
        let keys = []
        let items = []
        let values = []
        for (let key of Object.keys(temp)) {
          keys.push(key)
        }
        for (let item of Object.values(temp)) {
          let tempitem = JSON.parse(item)
          items.push(tempitem)
          let value = 0;
          for (let item1 of Object.values(tempitem)) {
            value += item1.pos_score - item1.neg_score;
          }
          values.push(value);
        }
        return { values: values, items: items, keys: keys }

      }

      this.$http({
        url: '/api/correlation/',
        methods: 'get',
      })
        .then(res => {
          let temp = JSON.parse(res.data)
          let temp1 = JSON.parse(temp['correlation'])
          let temp2 = industryBasic(temp['industry'])
          this.initChart(temp1, temp2)
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });

    },
    initChart(data, data2) {

      //this.loading = false;
      let data0 = Object.values(data['000001.XSHE']);
      let links = [];
      let nameList = new Map();
      nameList.set('平安银行', 1)

      //console.log(data, data0)

      //找分数
      let findScore = data0 => {
        for (let item of data0) {
          let index = data2.keys.findIndex(name => {
            return name === item.target
          });
          if (item.target) {
            if (!item.weight) item.weight = 0.5;
            item.weight = item.weight * data2.values[index];
            item.category = data2.values[index] >= 0 ? 1 : 2;
          }
        }
      }
      findScore(data0);

      let points = [{ name: '平安银行', value: 20.038777113, category: 1, symbolSize: 80, label: { fontSize: 20 } }];

      let graphData = (data0, points, links, nameList, round = 0) => {
        for (let item of data0) {
          if (item.target) {
            //防止重复
            if (!nameList.get(item.target)) {
              nameList.set(item.target, 1)
              points.push({ name: item.target, value: item.weight, category: item.category, symbolSize: Math.abs(item.weight), label: { fontSize: !round ? '16px' : '12px' } })
            }
            links.push({ source: item.source, target: item.target, label: { show: true, fontSize: '8px' } })
          }
        }
      }
      graphData(data0, points, links, nameList);

      for (let item of data0) {
        if (item.target) {
          //找到整个data中的对应对象，转为一个数组，相当于上面的data0
          for (let subitem of Object.values(data)) {
            //console.log(subitem)
            //只可能一个为空
            if (item.target === Object.values(subitem)[0]?.source || item.target === Object.values(subitem)[1]?.source) {
              let tempitem = Object.values(subitem)
              findScore(tempitem, 1);
              graphData(tempitem, points, links, nameList)
            }
          }
        }
      }

      //console.log(points, links)

      let myChart = echarts.init(document.getElementById("main"));
      myChart.resize();  //自适应大小
      myChart.setOption(this.setOption(points, links));
    },
    setOption(data, links) {
      let option = {
        title: {
          text: '业内关系图谱',
          top: '20px',
          left: '20px',
        },

        tooltip: {}, //提示框
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            color: [
              '#CD48AE',
              '#2CABFC',
              '#aaa'
            ],
            categories: [{
              name: 'main',
              itemStyle: {
                color: '#aaa',
              },
              symbol: 'circle',
            },
            {
              name: 'up',
              itemStyle: {
                color: '#CD48AE',
              },
              symbol: 'circle',
            },
            {
              name: 'down',
              itemStyle: {
                color: '#2fc',
              },
              symbol: 'circle',
            },],
            // symbolSize: 50, //倘若该属性不在link里，则其表示节点的大小；否则即为线两端标记的大小
            symbolSize: (value, params) => {
              return Math.abs(params.data.value);
            },
            roam: true, //鼠标缩放功能
            label: {
              show: true, //是否显示标签
              position: 'right',
              fontSize: 12,
            },
            focusNodeAdjacency: true, //鼠标移到节点上时突出显示结点以及邻节点和边
            edgeSymbol: ["none", "arrow"], //关系两边的展现形式，也即图中线两端的展现形式。arrow为箭头
            edgeSymbolSize: [3, 6],
            draggable: true,
            edgeLabel: {
              fontSize: 10, //关系（也即线）上的标签字体大小
            },
            force: {
              repulsion: 2000,
              edgeLength: 275,
            },
            data: data,
            // links: [],
            links: links,
            lineStyle: {
              color: 'source',
              opacity: 0.9,
              width: 1,
              curveness: 0,
            },
            emphasis: {
              scale: true,
              focus: 'adjacency',
            }
          },
        ],
      };
      //console.log(option)
      return option;
    },

  },
};
</script>
<style scoped>
#main {
  background-color: #fff;
  margin-top: 0px;
  margin-left: -1px;
  border-radius: 5px;
}

.mid-main {
  width: 50%;
  height: 100%;
  margin-right: 4px;
}
</style>
