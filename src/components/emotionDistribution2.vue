<template>
    <div id="agent" class="trendChart"></div>
</template>
  
<script>
import * as echarts from "echarts";

export default {
    props: ['industryTrend'],
    data() {
        return {
            commentsCurveTitle: ['农林牧渔', '基础化工', '钢铁', '有色金属', '电子', '汽车', '家用电器', '食品饮料', '纺织服饰', '轻工制造', '医药生物', '公用事业', '交通运输', '房地产', '商贸零售', '社会服务', '银行', '非银金融', '综合', '建筑材料', '建筑装饰', '电力设备', '机械设备', '国防军工', '计算机', '传媒', '通信', '煤炭', '石油石化', '环保', '美容护理'],
            commentsCurveTime: [
                "十月", "十一月", "十二月", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
            ],
            commentsCurveData: []
        };
    },
    mounted() {
        console.log(this.industryTrend)
        this.agentEcharts();
    },
    methods: {
        //近12个月代理商/客户机构新增数量走势

        agentEcharts() {
            //['农林牧渔', '基础化工', '钢铁', '有色金属', '电子', '汽车', '家用电器', '食品饮料', '纺织服饰', '轻工制造', '医药生物', '公用事业', '交通运输', '房地产', '商贸零售', '社会服务', '银行', '非银金融', '综合', '建筑材料', '建筑装饰', '电力设备', '机械设备', '国防军工', '计算机', '传媒', '通信', '煤炭', '石油石化', '环保', '美容护理']
            let commentsCurveTitle = ['农林牧渔', '基础化工', '钢铁', '有色金属', '电子', '汽车', '家用电器', '食品饮料', '纺织服饰', '轻工制造', '医药生物', '公用事业', '交通运输', '房地产', '商贸零售', '社会服务', '银行', '非银金融', '综合', '建筑材料', '建筑装饰', '电力设备', '机械设备', '国防军工', '计算机', '传媒', '通信', '煤炭', '石油石化', '环保', '美容护理'];
            let commentsCurveTime = [
                "十月", "十一月", "十二月", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
            ];
            let commentsCurveData = [];
            let series = [];
            let arrvalue = Object.values(this.industryTrend);
            let keyvalue = Object.keys(this.industryTrend)
            for (let i = 0; i < arrvalue.length; i++) {
                let temparr = []
                for (let j = 0; j < arrvalue[i].length; j++) {
                    //写的时候九月，记得改
                    temparr.push(arrvalue[i][(j + 9) % 12])
                }
                series.push({
                    name: keyvalue[i],
                    type: "line",
                    stack: "",
                    smooth: true,
                    symbolSize: 5,
                    data: temparr,
                    //data: [-50, 26, 90, 26, 50, 66, 50, -26, 50, 126, 50, 56]
                })
            }
            let myChart = echarts.init(document.getElementById("agent"));
            let option = {
                colorBy: 'series',
                title: {
                    text: '行业情绪走势',
                    top: '20px',
                    left: '20px',
                },
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
                    itemGap: 10,
                    x: "25%",
                    y: "5%",
                    data: commentsCurveTitle
                },
                grid: {
                    top: '40%',
                    left: "5%",
                    right: "5%",
                    bottom: "10%",
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
                color: ['#CD48AE', '#2CABFC', '#EAC2A8', '#B2900E', '#897F96', '#F93799', '#E7BDCF', '#A18F17', '#D53976', '#A21BA7', '#62E78C', '#FE3EF1', '#4CA9A1', '#0A9E5B', '#C93EDC', '#328EA8', '#AF6D77', '#188070', '#13A7B2', '#E4B707', '#5C95F3', '#329625', '#E91FA8', '#238226', '#FB4E7A', '#C5FBB3', '#DA8B19', '#CE986E', '#788F5D', '#8EAFF7', '#14BCD2', '#BDEEA1', '#0B29B4', '#424229', '#72BEE2', '#CF9C69', '#C6CB2C', '#1B5F59', '#94F7EF', '#147131', '#1FE60B', '#D7C798', '#9488C5', '#C3CB3D', '#4D5C13', '#A7924B', '#233EDF', '#1D569F', '#F92512', '#AFD07F', '#6ADCA2', '#47CED2', '#EFAF4D', '#1F72BE', '#C1FEB8', '#9710FB', '#DD62BA'],
                textStyle: {
                    fontFamily: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'PingFang SC',
                        'Microsoft YaHei', 'monospace'],
                },
                //数据
                series: series,
            };
            myChart.setOption(option);
            window.addEventListener("resize", () => {
                myChart.resize();
            });
        },
    },
}
</script>
  
<style scoped>
.trendChart {
    width: 100%;
    height: 100%;
}
</style>