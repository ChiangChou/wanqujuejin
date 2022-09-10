<template>
    <div id="charts"></div>
</template>
  
  <script>
import * as echarts from 'echarts'

export default {
    props:["names", "scores"],
    mounted() {
        this.initCharts();
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
        initCharts() {
            let color2 = this.gradient('#2CABFC', '#CD48AE', 49)
            let color1 = [];
            let data0 = [];
            let tempname = this.names, tempscore = this.scores
            for(let i = 0; i<tempscore.length;i++){
                data0.push([tempname[i].industry_name, tempscore[i]*100 - 30])
            }
            data0.sort((a, b) => {
                return b[1] - a[1];
            });

            for (let item of data0) {
                if (item[1] <= 0) color1.push('#2CABFC');
                else color1.push('#CD48AE');
            }
            let charts = echarts.init(document.getElementById("charts"));
            let option = {
                xAxis: {
                    type: "category",
                    axisLabel: {
                        rotate:45,
                        fontSize: 12,
                    }
                },
                yAxis: {
                    type: "value",
                    boundaryGap: true,
                },
                grid: [{
                    left: "50px",
                    right: "20px",
                    top: "10px",
                    height: "85%"
                },],
                textStyle: {
                    fontFamily: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
                        'Microsoft YaHei', 'monospace'],
                },
                color: color1, // 柱状图颜色
                dataset: {
                    source: data0,
                },
                series: [
                    // 图标列设置
                    {
                        type: "bar", stack: "total", name: "情感值",
                        colorBy: 'data',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                focus: 'self',
                            }
                        }
                    },
                ],
                tooltip: {
                    // 提示框组件
                },
            };
            charts.setOption(option);
        },
    },
};
</script>
  
  <style scoped>
  #charts {
      width: 100%;
      height: 486px;
  }
  </style>
  
