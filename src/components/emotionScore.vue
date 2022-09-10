<template>
    <div class="chart_4" id="main"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
    props: ["emotionScore"],
    data() {
        return {

        }
    },
    mounted() {
        this.chartdom = echarts.init(document.getElementById("main"));

        this.chart_write(this.emotionScore.pos_score, this.emotionScore.neg_score);
    },
    watch: {
        emotionScore: {
            handler: function (newvalue, oldvalue) {
                let pos_score = newvalue.pos_score, neg_score = newvalue.neg_score;
                this.chart_write(pos_score, neg_score);
            },
            
        }
    },
    methods: {
        chart_write(pos_score, neg_score) {
            let myChart = this.chartdom;
            let max = 100;
            let score = Math.round(pos_score - neg_score);
            // console.log(this.emotionScore)
            if (score > 100) score = 100;
            else if (score < -100) score = -100;
            let data0 = { //显示的数据
                "name": '情绪值',
                "num": score,
            }
            let emotionColor = '#CD48AE', emotionText = '乐观情绪';
            if (data0.num < 0) {
                emotionColor = '#2CABFC';
                emotionText = '悲观情绪'
            }
            else if (data0.num < 50) {
                emotionColor = '#aaa';
                emotionText = '中性情绪';
            }
            data0.rate = (data0.num + 100) / 2;
            let option = {
                angleAxis: {
                    show: false,
                    max: max * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
                    type: 'value',
                    startAngle: 210, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
                    splitLine: {
                        show: false //隐藏坐标
                    }
                },
                textStyle: {
                    fontFamily: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
                        'Microsoft YaHei', 'monospace'],
                },
                barMaxWidth: 18, //圆环宽度
                radiusAxis: { //隐藏坐标
                    show: false,
                    type: 'category',
                },
                polar: { //设置圆环位置和大小
                    center: ['50%', '50%'],
                    radius: '230'
                },
                graphic: [
                    {
                        type: 'text',
                        left: 'center',
                        top: '65%',
                        z: 999,
                        style: {
                            text: emotionText,
                            fill: emotionColor,
                            fontWeight: 600,
                            fontSize: 20,
                        },
                    },
                ],
                series: [{
                    type: 'bar',
                    data: [{ //上层圆环，用于显示真实数据
                        value: data0.rate,
                        itemStyle: {
                            color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1, //从左到右 0-1
                                y2: 0,
                                colorStops: [{
                                    offset: 0,
                                    color: '#2CABFC' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#CD48AE' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgb(44,172,252)', //加白色阴影产生高亮效果
                            shadowBlur: 15
                        }
                    }],
                    barGap: '-100%', //柱间距离,用来将上下两层圆环重合
                    coordinateSystem: 'polar', //类型，极坐标
                    roundCap: true, //顶端圆角
                    z: 2 //圆环层级，和zindex相似
                }, { //下层圆环，用于显示最大值
                    type: 'bar',
                    data: [{
                        value: max,
                        itemStyle: {
                            color: '#265195',
                            shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                            shadowBlur: 5,
                            shadowOffsetY: 2
                        }
                    }],
                    barGap: '-100%', //柱间距离,用来将上下两层圆环重合
                    coordinateSystem: 'polar', //类型，极坐标
                    roundCap: true, //顶端圆角
                    z: 1 //圆环层级，和zindex相似
                },
                { //仪表盘
                    type: 'gauge',
                    radius: '100%',
                    startAngle: 210, //起始角度，同极坐标
                    endAngle: -30, //终止角度，同极坐标
                    max: max,
                    splitNumber: 5, //分割线个数（除原点外）
                    axisLine: { // 坐标轴线
                        show: false
                    },
                    pointer: {
                        show: false
                    },
                    axisLabel: {
                        // 坐标轴数字
                        textStyle: {
                            fontSize: 10,
                            color: "#13B5FC"
                        },
                    },
                    axisTick: { // 坐标轴标记
                        length: 10,
                        lineStyle: {
                            color: "#13B5FC",
                            width: 2,
                        }
                    },
                    splitLine: { // 分隔线
                        length: 5,
                        lineStyle: {
                            width: 1,
                        }
                    },
                    title: { //标题，显示'情绪值'
                        textStyle: {
                            color: '#2c2c2c',
                            shadowColor: '#2c2c2c',
                            fontWeight: 600,
                            fontSize: 24
                        },
                        offsetCenter: ["0", '-20%'] //位置偏移
                    },
                    detail: { //仪表盘数值
                        formatter: function (params) {
                            var name = data0.num.toString()
                            var list = ''
                            for (var i = 0; i < name.length; i++) {
                                list += '{value|' + name[i] + '}' //每个数字用border隔开
                                if (i !== name.length - 1) {
                                    list += '{margin|}' //添加margin值
                                }
                            }
                            return [list]
                        },
                        offsetCenter: ["0", '5%'],
                        rich: { //编辑富文本样式
                            value: {
                                width: 24,
                                height: 28,
                                borderColor: '#2CABFC',
                                borderWidth: 2,
                                borderRadius: 5,
                                lineHeight: 1000,
                                fontSize: 20,
                                fontWeight: 600,
                                padding: [4, 2, 4, 2],
                                color: '#2c2c2c',
                                shadowColor: 'rgb(44,172,252)',
                                shadowBlur: 5
                            },
                        }

                    },
                    data: [{
                        value: data0.num,
                        name: data0.name
                    }],
                    min: -100,
                    max: 100
                }
                ]
            }
            myChart.setOption(option);
        },
    }
}
</script>
<style scoped>
.chart_4 {
    width: 400px;
    height: calc(100vh - 972px);
    min-height: 300px;
}
</style>