<!--悬浮的时候还是负的-->
<template>
    <div id="charts2"></div>
</template>
  
  <script>
import * as echarts from 'echarts'

export default {
    props: ['stockSeasonIncome'],
    mounted() {
        this.initCharts();
    },    
    watch: {
        stockSeasonIncome: {
            handler: function (newvalue, oldvalue) {
                //let pos_score = newvalue.pos_score, neg_score = newvalue.neg_score;
                this.initCharts();
            },
            
        }
    },
    methods: {
        rgbToHex(r, g, b) {
            var hex = ((r << 16) | (g << 8) | b).toString(16);
            return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
        },
        hexToRgb(hex) {
            var rgb = [];
            for (var i = 1; i < 7; i += 2) {
                rgb.push(parseInt("0x" + hex.slice(i, i + 2)));
            }
            return rgb;
        },
        gradient(startColor, endColor, step) {
            //将hex转换为rgb
            var sColor = this.hexToRgb(startColor),
                eColor = this.hexToRgb(endColor);

            //计算R\G\B每一步的差值
            let rStep = (eColor[0] - sColor[0]) / step;
            let gStep = (eColor[1] - sColor[1]) / step;
            let bStep = (eColor[2] - sColor[2]) / step;

            var gradientColorArr = [];
            for (var i = 0; i < step; i++) {
                //计算每一步的hex值
                gradientColorArr.push(this.rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])));
            }
            return gradientColorArr;
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
        //查找有没有亏损的数据，把亏损值转正，然后生成一个颜色数组
        initCharts() {
            let data0 = this.stockSeasonIncome;
            this.numArrayToDate(data0);
            let charts = echarts.init(document.getElementById("charts2"));
            let option = {
                xAxis: {
                    type: "category",
                    axisLabel: {
                        fontSize: 10,
                    }
                },
                yAxis: {
                    type: "value",
                    boundaryGap: true,
                    axisLabel: {
                        formatter: function (value) {
                            if (value < 0) {
                                return -value;
                            }
                            else {
                                return value;
                            }
                        }
                    }
                },
                grid: [{
                    left: "50px",
                    right: "30px",
                    top: "20px",
                    height: "85%"
                },],
                textStyle: {
                    fontFamily: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
                        'Microsoft YaHei', 'monospace'],
                },
                legend: {
                    // itemWidth: 10,
                    // itemHeight: 10,
                    data: [{ name: "销售总营收(亿元)" },],
                },
                dataset: {
                    source: data0,
                },
                series: [
                    // 图标列设置
                    {
                        type: "bar", stack: "total", name: "销售总营收(亿元)",
                        itemStyle: {
                            color: '#2CABFC',
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                focus: 'self',
                            }
                        },
                    },
                ],
                tooltip: {
                    // 提示框组件
                },
            };
            for (let item of data0) {
                if (item[2]!=0) {
                    option.series.push({
                        type: "bar", stack: "total", name: "销售净利润(亿元)",
                        itemStyle: {
                            color: '#CD48AE',
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                focus: 'self',
                            }
                        },
                    },);
                    option.legend.data.push({ name: "销售净利润(亿元)" });
                    break;
                }
            }
            for (let item of data0) {
                if (item[3]!=0) {
                    option.series.push({
                        type: "bar", stack: "total", name: "亏损额（亿元）",
                        colorBy: 'data',
                        itemStyle: {
                            color: '#6db',
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                focus: 'self',
                            }
                        },

                    },);
                    option.legend.data.push({ name: '亏损额（亿元）' });
                    break;
                }
            }
            charts.setOption(option);
        },
    },
};
</script>
  
  <style scoped>
  #charts2 {
      width: calc(100%-20px);
      height: 300px;
      margin: 0 10px;
  }
  </style>
  
