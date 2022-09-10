<template>
    <div class="chart3" id="charts3"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
    props:["emotionScore"],
    data() {
        return {

        }
    },
    mounted() {
        this.chart_write();
    },
    watch: {
        emotionScore: {
            handler: function (newvalue, oldvalue) {
                //let pos_score = newvalue.pos_score, neg_score = newvalue.neg_score;
                this.chart_write();
            },
            
        }
    },
    methods: {
        chart_write() {
            let myChart = echarts.init(document.getElementById("charts3"));
            let posNum =this.emotionScore.pos_count, negNum = this.emotionScore.neg_count, midNum = this.emotionScore.mid_count
            
            let option = {
                textStyle: {
                    fontSize: 12,   // 调节字体大小
                    fontFamily: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
                        'Microsoft YaHei', 'monospace'],
                },
                title: {
                    text: '',       // 主标题名称
                    subtext: '',    // 副标题名称
                    x: 'center'      // 标题的位置
                },
                tooltip: {
                    trigger: 'item',

                },
                legend: {
                    orient: 'vertical',         // 标签名称垂直排列
                    x: 'right',                 // 标签的位置
                    data: ['乐观资讯', '悲观资讯', '中性资讯'],
                    textStyle: {
                        color: '#2c2c2c',
                        fontSize: 12,
                        fontWeight: 600,
                    }
                },                              // 标签变量名称
                color: ['#CD48AE', '#2CABFC', '#aaa'],
                calculable: true,
                series: [
                    {
                        name: '情绪比重',                    // 图表名称
                        type: 'pie',                         // 图表类型
                        radius: [30, 120],                 // 图表内外半径大小
                        center: ['50%', '50%'],            // 图表位置
                        roseType: 'series',
                        itemStyle: {
                            normal: {
                                show: true,
                                formatter: '{b}({d}%)',      // 显示百分比
                                label: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                }
                            },
                            color: '#2c2c2c',

                        },
                        data: [
                            { value: posNum, name: '乐观资讯' },           // 变量对应的具体数据
                            { value: negNum, name: '悲观资讯' },
                            { value: midNum, name: '中性资讯' },
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        },
    }
}
</script>
<style scoped>
.chart3 {
    width: calc(100% - 20px);
    height: calc(100vh - 972px);
    min-height: 300px;
    margin-right: 20px;
}
</style>