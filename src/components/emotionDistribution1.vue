<template>
    <div class="chart3" id="charts3"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
    props: ["industryName", "industryScore"],
    data() {
        return {

        }
    },
    mounted() {
        this.chart_write();
    },
    watch: {

    },
    methods: {
        chart_write() {
            let names = this.industryName, scores = this.industryScore;
            let tempData = [];
            for (let i = 0; i < names.length; i++) {
                tempData.push({ value: scores[i] * 100, name: names[i] })
            }
            let myChart = echarts.init(document.getElementById("charts3"));
            //let posNum =this.emotionScore.pos_count, negNum = this.emotionScore.neg_count, midNum = this.emotionScore.mid_count

            let option = {
                textStyle: {
                    fontSize: 12,   // 调节字体大小
                    fontFamily: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
                        'Microsoft YaHei', 'monospace'],
                },
                title: {
                    text: '行业情绪',       // 主标题名称
                    subtext: '',    // 副标题名称
                    x: 'left',      // 标题的位置
                    top: '20',
                    left: '20',
                    label: {
                        fontSize: '20',
                    }
                },

                tooltip: {
                    trigger: 'item',

                },
                legend: {
                    top: '20',
                    orient: 'vertical',         // 标签名称垂直排列
                    x: 'right',                 // 标签的位置
                    data: names,
                    textStyle: {
                        color: '#2c2c2c',
                        fontSize: 10,
                        fontWeight: 600,
                    }
                },
                itemStyle: {
                    borderRadius: 5
                },                             // 标签变量名称
                color: ['#CD48AE', '#2CABFC', '#EAC2A8', '#B2900E', '#897F96', '#F93799', '#E7BDCF', '#A18F17', '#D53976', '#A21BA7', '#62E78C', '#FE3EF1', '#4CA9A1', '#0A9E5B', '#C93EDC', '#328EA8', '#AF6D77', '#188070', '#13A7B2', '#E4B707', '#5C95F3', '#329625', '#E91FA8', '#238226', '#FB4E7A', '#C5FBB3', '#DA8B19', '#CE986E', '#788F5D', '#8EAFF7', '#14BCD2', '#BDEEA1', '#0B29B4', '#424229', '#72BEE2', '#CF9C69', '#C6CB2C', '#1B5F59', '#94F7EF', '#147131', '#1FE60B', '#D7C798', '#9488C5', '#C3CB3D', '#4D5C13', '#A7924B', '#233EDF', '#1D569F', '#F92512', '#AFD07F', '#6ADCA2', '#47CED2', '#EFAF4D', '#1F72BE', '#C1FEB8', '#9710FB', '#DD62BA'],
                calculable: true,
                series: [
                    {
                        name: '情绪值',                    // 图表名称
                        type: 'pie',                         // 图表类型
                        radius: [30, 200],                 // 图表内外半径大小
                        center: ['40%', '50%'],            // 图表位置
                        roseType: 'area',
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
                        data: tempData,
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
    width: 100%;
    height: 100%;
    min-height: 300px;
    margin-right: 20px;
}
</style>