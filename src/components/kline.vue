<template>
  <div class="echartComponent">
    <div id="echartContainer" ref="echartContainer"></div>
    <div class="options">
      <button @click="DayK" :style="this.clickcolor[this.dayWeekMonthChosen[0]]">日</button>
      <button @click="WeekK" :style="this.clickcolor[this.dayWeekMonthChosen[1]]">周</button>
      <button @click="monthK" :style="this.clickcolor[this.dayWeekMonthChosen[2]]">月</button>
      <button @click="MA(5, $event)" style="color:#2c2c2c; font-weight:600;" class="ma">MA5</button>
      <button @click="MA(10, $event)" style="color:#2c2c2c; font-weight:600;" class="ma">MA10</button>
      <button @click="MA(20, $event)" style="color:#2c2c2c; font-weight:600;" class="ma">MA20</button>
      <button @click="MA(30, $event)" style="color:#2c2c2c; font-weight:600;" class="ma">MA30</button>
    </div>
  </div>

</template>

<script>
var echarts = require("echarts");
export default {
  props: ["newsinfo", "stockinfo"],
  data() {
    return {
      clickcolor: [{ 'color': '#8c8c8c', 'font-weight': 400 }, { 'color': '#2c2c2c', 'font-weight': 600 },],
      dayWeekMonthChosen: [1, 0, 0],
      isDataInit: false,
      //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9, volume10
      //['2022010-18',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
      data: [],
      // k线配置项
      option: {},
      markPoint: { data: [] },
    };
  },
  mounted() {
    this.chart_write();
  },
  watch: {
    stockinfo: {
      handler: function (newvalue, oldvalue) {
        console.log(newvalue)
        this.chart_write();
      },
    }
  },
  methods: {
    chart_write() {
      //this.formatDate(this.stockinfo)
      this.initData(this.stockinfo);
      //.log(this.data)
      // 这里实现的是一个比较简单的，可以按照需求将函数移动到methods函数中
      let temp = this.arrayCopy(this.data);
      this.numArrayToDate(temp);
      this.data0 = this.splitData(temp);
      this.addMarkPoint();
      this.setOption(this.data0);
      // 进行初始化
      this.charts = echarts.init(this.$refs.echartContainer);
      this.charts.setOption(this.option);
    },
    addMarkPoint() {
      let temparr = this.arrayCopy(this.data);
      const map1 = new Map();
      for (let i = 0; i < temparr.length; i++) {
        map1.set(temparr[i][0], i);
      }
      let stasticarr = temparr.map(item => {
        return { p: 0, n: 0 };
      });

      let maxDate = temparr[temparr.length - 1][0];
      for (let i of this.newsinfo) {
        let num = i.time.substring(0, 4) * 10000 + i.time.substring(5, 7)*100 + i.time.substring(8, 10)*1;
        while (1) {
          let judge = map1.get(num);
          if (judge) {
            if (i.forecast > 0) stasticarr[judge].p += 1;
            else stasticarr[judge].n += 1;
            break;
          }
          //如果找不到就继续找往后的日期
          else num++;
          if (num > maxDate) break;
        }
      }
      let a = { data: [] }
      for (let i = 0; i < stasticarr.length; i++) {
        if (stasticarr[i].p > 0) {
          a.data.push({
            coord: [i, temparr[i][4]],
            symbol: "pin",
            symbolSize: 12,
            value: stasticarr[i].p,
            animation: true,
            label: {
              show: true,
              color: '#c23531',
              fontSize: 12,
              offset: [0, -12],
            },
            itemStyle: { color: '#c23531' }
          })
        }
        if (stasticarr[i].n > 0) {
          a.data.push({
            coord: [i, temparr[i][3]],
            symbol: "pin",
            symbolSize: 12,
            symbolRotate: 180,
            value: stasticarr[i].n,
            animation: true,
            label: {
              show: true,
              color: '#6db',
              fontSize: 12,
              offset: [0, 15],
            },
            itemStyle: { color: '#6db' }
          })
        }
      }
      this.markPoint = a;
    },
    splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volume = [];
      //var macds = [];
      //var difs = [];
      //var deas = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volume.push(rawData[i][4]);
        //macds.push(rawData[i][6]);
        //difs.push(rawData[i][7]);
        //deas.push(rawData[i][8]);
      }
      return {
        categoryData: categoryData,
        values: values,
        volume: volume,
        //macds: macds,
        //difs: difs,
        //deas: deas
      };
    },
    MA(x, e) {
      e.target.style.color = e.target.style.color === '#2c2c2c' ? '#8c8c8c' : '#2c2c2c';
      e.target.style.fontWeight = e.target.style.fontWeight === '400' ? '600' : '400';
      let i;
      switch (x) {
        case 5: i = 1; break;
        case 10: i = 2; break;
        case 20: i = 3; break;
        case 30: i = 4; break;
      }
      let a = this.option.series[i].lineStyle.normal.opacity;
      this.option.series[i].lineStyle.normal.opacity = a === 0 ? 0.5 : 0;
      this.charts.setOption(this.option, true);
    },
    // ma均线函数
    calculateMA(dayCount) {
      var result = [];
      for (var i = 0, len = this.data0.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += this.data0.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
    setOption(data0) {
      this.option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            lineStyle: {
              color: '#515151',
            },
            crossStyle: {
              color: '#515151',
            }
          },

        },
        textStyle: {
          color: '#2c2c2c',
          fontFamily: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
            'Microsoft YaHei', 'monospace'],
        },
        color: this.setColor(data0.values),
        grid: [
          {
            left: "10px",
            right: "50px",
            top: "6px",
            height: "75%"
          },
          {
            left: "10px",
            right: "50px",
            top: "78%",
            height: "12%"
          },
        ],
        xAxis: [
          {
            type: "category",
            data: data0.categoryData,
            scale: true,
            boundaryGap: true,
            axisTick: {
              show: false,
            },
            show: false,
            //坐标轴线
            axisLine: {
              onZero: false,
              show: false,
              lineStyle: {
                color: "#2c2c2c"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'solid',
                color: '#d5d5d5',
                width: 1,
              },
            },
            splitNumber: 20,
            axisPointer: {
              label: {
                show: false,
              }
            }
          },
          {
            type: "category",
            data: data0.categoryData,
            scale: true,
            boundaryGap: true,
            gridIndex: 1,
            axisTick: {
              show: false,
            },
            show: true,
            //坐标轴线
            axisLine: {
              onZero: false,
              show: false,
              lineStyle: {
                color: "#2c2c2c"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'solid',
                color: '#d5d5d5',
                width: 1,
              },
            },
            splitNumber: 20,
            axisPointer: {
              label: {
                show: false,
              }
            }
          },
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#2c2c2c"
              }
            },
            axisPointer: {
              label: {
                color: '#f5f5f5'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#ddd',
                width: 1,
                opacity: 0.5,
              }
            },
            position: "right"
          },
          {
            boundaryGap: true,
            splitLine: {
              show: false,
            },
            scale: true,
            min: value => {
              return 1.5 * value.min - 0.5 * value.max;
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              show: false,
              interval: '50',
            },
            axisPointer: {
              label: {
                color: '#f5f5f5'
              }
            },
            gridIndex: 1,
            position: "right"
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 100,
            end: 50
          },
          {
            show: true,
            type: "slider",
            bottom: '10',
            start: 50,
            end: 100,
            textStyle: {
              color: '#2c2c2c'
            },
            height: '3%',
          },
          {
            show: false,
            xAxisIndex: [0, 1],
            type: "slider",
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: "数据",
            type: "candlestick",
            data: data0.values,
            markPoint: this.markPoint,
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: 999,
                }
              ]
            },
            itemStyle: {
              color0: '#6db',
              borderColor0: '#6db',
            }
          },
          {
            name: "MA5",
            type: "line",
            data: this.calculateMA(5),
            smooth: true,
            lineStyle: {
              normal: {
                opacity: 1
              },
            },
            symbol: 'none',
            color: '#b77',
            show: false,
          },
          {
            name: "MA10",
            type: "line",
            data: this.calculateMA(10),
            smooth: true,
            lineStyle: {
              normal: {
                opacity: 0.5
              }
            },
            symbol: 'none',
            color: '#e88',
          },
          {
            name: "MA20",
            type: "line",
            data: this.calculateMA(20),
            smooth: true,
            lineStyle: {
              normal: {
                opacity: 0.5
              }
            },
            symbol: 'none',
            color: '#e8e',
          },
          {
            name: "MA30",
            type: "line",
            data: this.calculateMA(30),
            smooth: true,
            lineStyle: {
              normal: {
                opacity: 0.5
              }
            },
            symbol: 'none',
            color: '#88e',
          },
          {//成交量柱状图的设置
            name: '成交量',
            type: 'bar',
            colorBy: 'data',
            //barWidth: 30,//柱状图的宽度
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data0.volume,
          }
        ]
      };
    },
    formatDate(item) {
      let a = new Date(item.time);
      return a.getFullYear() * 10000 + (a.getMonth() + 1) * 100 + a.getDate()
    },
    //t k s d g l
    initData(arr) {
      let newArray = [];
      for (let item of arr) {
        let tempArr = [];
        tempArr.push(this.formatDate(item));
        tempArr.push(item.open);
        tempArr.push(item.close);
        tempArr.push(item.low);
        tempArr.push(item.high);
        tempArr.push(item.volume);
        newArray.push(tempArr);
      }
      this.data = newArray;
      this.isDataInit = true;
    },
    numArrayToDate(arr) {
      for (let item of arr) {
        let s = item[0].toString();
        switch (s.length) {
          case 8: s = s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6, 8); break;
          case 6: s = s.slice(0, 4) + '-' + s.slice(4, 6); break;
          case 4:
        }
        item[0] = s;
      }
    },
    numToDate(num) {
      let s = num.toString();
      switch (s.length) {
        case 8: s = s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6, 8); break;
        case 6: s = s.slice(0, 4) + '-' + s.slice(4, 6); break;
        case 4:
      }
      return s;
    },
    filterToMonth(arr) {
      for (let item of arr) {
        item[0] = Math.round(item[0] / 100);
      }
      let idx = arr[0];
      //temparr存储各个月份数组，tempitem表示月份数组，monthdata是处理后的月份数据
      let temparr = [], tempitem = [], monthdata = [];
      for (let item of arr) {
        if (item[0] === idx[0]) {
          tempitem.push(item);
        }
        else {
          temparr.push(tempitem);
          tempitem = [];
          tempitem.push(item);
          idx = item;
        }
      }
      temparr.push(tempitem);
      for (let item of temparr) {
        const newArray = item[0].map((col, i) => item.map(row => row[i]));
        let element = [this.numToDate(newArray[0][0])];
        element.push(newArray[1][0]);
        element.push(newArray[2].at(-1));
        element.push(Math.min(...newArray[3]));
        element.push(Math.max(...newArray[4]));
        element.push(newArray[5].reduce((total, value) => {
          return total + value;
        }))
        monthdata.push(element);
      }
      return monthdata
    },
    filterToWeek(arr) {
      let idx = arr[0];
      let day = new Date(this.numToDate(idx[0]));
      if (day.getDay() != 1) {
        day = new Date(day - (day.getDay() - 1) * 24 * 60 * 60 * 1000);
      }
      let temparr = [], tempitem = [], weekdata = [];
      for (let item of arr) {
        let tempDay = new Date(this.numToDate(item[0]));
        let interval = parseInt((tempDay - day) / (24 * 60 * 60 * 1000));
        if (interval < 7) {
          tempitem.push(item);
        }
        else {
          temparr.push(tempitem);
          tempitem = [];
          tempitem.push(item);
          day = tempDay;
          if (day.getDay() != 1) {
            day = new Date(day - (day.getDay() - 1) * 24 * 60 * 60 * 1000);
          }
        }
      }
      temparr.push(tempitem);
      for (let item of temparr) {
        let newArray = item[0].map((col, i) => item.map(row => row[i]));
        let element = []
        element.push(this.numToDate(newArray[0][0]));
        element.push(newArray[1][0]);
        element.push(newArray[2].at(-1));
        element.push(Math.min(...newArray[3]));
        element.push(Math.max(...newArray[4]));
        element.push(newArray[5].reduce((total, value) => {
          return total + value;
        }))
        console.log(element)
        weekdata.push(element);
      }
      console.log(weekdata[0], weekdata[0][1]);
      return weekdata;
    },
    DayK() {
      this.dayWeekMonthChosen = [1, 0, 0];
      let temp = this.arrayCopy(this.data);
      this.numArrayToDate(temp);
      this.data0 = this.splitData(temp);
      this.setOption(this.data0);
      this.charts.setOption(this.option);
    },
    WeekK() {
      this.dayWeekMonthChosen = [0, 1, 0];
      let temp = this.arrayCopy(this.data);
      temp = this.filterToWeek(temp);
      //console.log(temp);
      this.data0 = this.splitData(temp);
      this.setOption(this.data0);
      this.charts.setOption(this.option);
    },
    monthK() {
      this.dayWeekMonthChosen = [0, 0, 1];
      let temp = this.arrayCopy(this.data);
      temp = this.filterToMonth(temp);
      this.data0 = this.splitData(temp);
      this.setOption(this.data0);
      this.charts.setOption(this.option);
    },
    arrayCopy(arr) {
      let copyArr = arr.map(ary => {
        return [...ary];
      });
      return copyArr;
    },
    numToDay(num) {
      let d = new Date(this.numArrayToDate(num));
      return d.getDay();
    },
    setColor(arr) {
      let colorArray = [];
      for (let item of arr) {
        if (item[0] - item[1] < 0) {
          colorArray.push('#c23531');
        }
        else colorArray.push('#6db');
      }
      return colorArray;
    }
  }
};
</script>

<style scoped>
.echartComponent {
  font-family: Consolas, Menlo, Monaco, 'Courier New', 'PingFang SC',
    'Microsoft YaHei', monospace;
}

#echartContainer {
  width: auto;
  flex: 1;
  height: 425px;
}

.options {
  display: flex;
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid #ccc;
  margin-top: 10px;
}

.options button {
  border: none;
  background-color: transparent;
  text-align: center;
  font-size: 16px;
  padding-right: 5px;
  margin-bottom: 10px;
  height: 30px;
  width: 60px;
  color: #8c8c8c;
  font-family: Consolas, Menlo, Monaco, 'Courier New', 'PingFang SC',
    'Microsoft YaHei', monospace;
  text-align: center;
}

.options button:nth-child(4):after {
  content: '|';
  font-weight: 600;
  color: #b77;
}

.options button:nth-child(5):after {
  content: '|';
  font-weight: 600;
  color: #e88;
}

.options button:nth-child(6):after {
  content: '|';
  font-weight: 600;
  color: #e8e;
}

.options button:nth-child(7):after {
  content: '|';
  font-weight: 600;
  color: #88e;
}
</style>