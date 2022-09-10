<template>
    <div id="agent" class="trendChart"></div>
  </template>
  
  <script>
    import * as echarts from "echarts";

    export default {
    data() {
      return {
        commentsCurveTitle: ["个股", "行业"],
        commentsCurveTime: [
        "十月", "十一月", "十二月", "一月", "二月", "三月", "四月", "五月","六月", "七月", "八月", "九月", 
        ],
        commentsCurveData: []
      };
    },
    methods: {
//近12个月代理商/客户机构新增数量走势

      agentEcharts() {
        let commentsCurveTitle =["个股", "行业"];
        let commentsCurveTime= [
        "十月", "十一月", "十二月", "一月", "二月", "三月", "四月", "五月","六月", "七月", "八月", "九月", 
        ];
        let commentsCurveData = [];
        let myChart = echarts.init(document.getElementById("agent"));
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: {
            // itemWidth: 10,
            // itemHeight: 10,
            itemGap: 20,
            x: "80%",
            y: "0",
            data: commentsCurveTitle
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            containLabel: true
          },
          xAxis: [{
            type: "category",
            boundaryGap: false,
            data: commentsCurveTime
          }],
          yAxis: [{
            type: "value"
          }],
          textStyle:{
                    fontFamily:['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
    'Microsoft YaHei', 'monospace'],
                },
          //数据
          series: [{
              name: "个股",
              type: "line",
              stack: "",
              color: '#2CABFC',
              smooth: true,
              symbolSize: 5,
              areaStyle: {
                //右，下，左，上
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [{
                      offset: 0,
                      color: '#2CABFC'
                    },
                    {
                      offset: 1,
                      color: "#ffffff"
                    }
                  ],
                  false
                )
              },
              data: [25, 28, 28, 40, 35, 27, 31, 25, 34, 25, 27, 32]
              //data: [-50, 26, 90, 26, 50, 66, 50, -26, 50, 126, 50, 56]
            },
            {
              name: "行业",
              type: "line",
              stack: "",
              color: '#CD48AE',
              smooth: true,
              symbolSize: 5,
              areaStyle: {
                //右，下，左，上
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [{
                      offset: 0,
                      color: '#CD48AE'
                    },
                    {
                      offset: 1,
                      color: "#ffffff"
                    }
                  ],
                  false
                )
              },
              data: [28, 33, 24, 32, 28, 27, 31, 36, 29, 27, 33, 27]
              //data: [65, 48, -65, -28, 26, 48, 65, 48, -2, 48, 65, 48]
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      },
     },
     mounted() {
      this.agentEcharts();
    }
   }
  </script>
  
  <style scoped>
  .trendChart {
    width: calc(100% - 10px);
    height: calc(100vh - 972px);
    margin: 0 5px 20px;
  }
  </style>