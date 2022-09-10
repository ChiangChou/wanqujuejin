<template>
        <!--<loading v-if="this.loading"></loading>-->
        <div id="main1" style="width: 100%; height: 100%"></div>
</template>
<style>

</style>
<script>
import * as echarts from 'echarts'
import loading from './loading.vue'


export default {
    name: "App",
    components: {
        loading: loading,
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
            this.$http({
                url: '/api/knowledge/',
                methods: 'get',
            })
                .then(res => {
                    let temp = JSON.parse(res.data)
                    temp.concept = Object.values(JSON.parse(temp.concept));
                    temp.rate = Object.values(JSON.parse(temp.rate));
                    temp.stocker = Object.values(JSON.parse(temp.stocker));
                    this.knowledgeInfo = temp;
                    this.initChart(temp);
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.log(error);
                });

        },
        initChart(data) {
            let points = [];
            let links = []
            points.push({ name: '平安银行', category: 0, symbolSize: 50, label:{fontSize: 20} })
            let names = ['法人', '概念', '十大股东', '主要业务','城市','股东数量'];

            points.push({ name: '法人', category: 1, symbolSize: 15, label:{fontSize: 16} })
            points.push({ name: '概念', category: 2, symbolSize: 15, label:{fontSize: 16} })
            points.push({ name: '十大股东', category: 3, symbolSize: 15, label:{fontSize: 16} })
            points.push({ name: '主要业务', category: 4,symbolSize: 15, label:{fontSize: 16} })
            points.push({ name: '城市', category: 5, symbolSize: 15, label:{fontSize: 16} })
            points.push({ name: '股东数量', category: 6, symbolSize: 15, label:{fontSize: 16} })

            for(let item of names){
                links.push({source: '平安银行', target: item})
            }

            points.push({ name: data.chairman, category: 1, symbolSize: 5 })
            links.push({ source: '法人', target: data.chairman,  })
            points.push({ name: data.main_business, category: 4, symbolSize: 5 })
            links.push({ source: '主要业务', target: data.main_business })
            points.push({ name: data.city, category: 5, symbolSize: 5 })
            links.push({ source: '城市', target: data.city })
            points.push({ name: data.num, category: 6, symbolSize: 5 })
            links.push({ source: '股东数量', target: data.num })

            for (let i = 0; i < data.rate.length; i++) {
                points.push({ name: data.stocker[i], category: 3, value: data.rate[i], symbolSize: 5 })
                links.push({ source: '十大股东', target: data.stocker[i] })
            }

            for (let i = 0; i < data.concept.length; i++) {
                points.push({ name: data.concept[i], category: 2, symbolSize: 20 })
                links.push({ source: '概念', target: data.concept[i] })
            }

            //console.log(points, links)

            let myChart = echarts.init(document.getElementById("main1"));
            myChart.resize();  //自适应大小
            myChart.setOption(this.setOption(points, links));
        },
        setOption(data, links) {
            let option = {
                title: {
                    text: '知识图谱',
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
                            name: '1',
                            itemStyle: {
                                color: '#CD48AE',
                            },
                            symbol: 'circle',
                        },
                        {
                            name: '2',
                            itemStyle: {
                                color: '#5470c6',
                            },
                            symbol: 'circle',
                        },
                        {
                            name: '3',
                            itemStyle: {
                                color: '#ee6666',
                            },
                            symbol: 'circle',
                        },
                        {
                            name: '4',
                            itemStyle: {
                                color: '#73c0de',
                            },
                            symbol: 'circle',
                        },
                        {
                            name: '5',
                            itemStyle: {
                                color: '#3ba272',
                            },
                            symbol: 'circle',
                        },
                        {
                            name: '6',
                            itemStyle: {
                                color: '#fc8452',
                            },
                            symbol: 'circle',
                        },
                        {
                            name: '7',
                            itemStyle: {
                                color: '#9a60b4',
                            },
                            symbol: 'circle',
                        },
                        ],
                        // symbolSize: 50, //倘若该属性不在link里，则其表示节点的大小；否则即为线两端标记的大小
                        symbolSize: (value, params) => {
                            return Math.abs(params.data.value);
                        },
                        roam: true, //鼠标缩放功能
                        label: {
                            show: true, //是否显示标签
                            position: 'right',
                            fontSize: 10,
                        },
                        focusNodeAdjacency: true, //鼠标移到节点上时突出显示结点以及邻节点和边
                        edgeSymbol: ["none", "arrow"], //关系两边的展现形式，也即图中线两端的展现形式。arrow为箭头
                        edgeSymbolSize: [3, 6],
                        draggable: true,
                        edgeLabel: {
                            fontSize: 12, //关系（也即线）上的标签字体大小
                        },
                        force: {
                            repulsion: 500,
                            edgeLength: 250,
                        },
                        data: data,
                        // links: [],
                        links: links,
                        lineStyle: {
                            color: 'source',
                            opacity: 0.9,
                            width: 1,
                            curveness: 0.1,
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
#main1 {
    background-color: #fff;
    margin-top: 0px;
    margin-left: -1px;
    border-radius: 5px;
}
</style>
  