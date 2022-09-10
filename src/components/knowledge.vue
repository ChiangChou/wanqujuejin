<!--Kline还不能更新 | resize | 预警还是热门的数据-->
<template>
    <div id="navi">
        <loading v-if="this.loading"></loading>

        <search v-if="!this.loading"></search>
        <div class="content" v-if="!this.loading">
            <div class="content-focus-mid">
                <div class="left">
                    <div class="info-module" style="height: 50%">
                        <div class="flex">
                            <h3 style="" @click="this.changeType(1)"
                                :style="this.currentTypeStyle[Math.abs(this.currentType - 1)]">热门</h3>
                            <h3 style="margin-left: 0;" @click="this.changeType(0)"
                                :style="this.currentTypeStyle[this.currentType]">预警</h3>
                        </div>
                        <stockItem v-for="(item, index) in this.stockinfo" :key="index" :stockinfo="item"
                            @itemChange="changeStock"></stockItem>
                    </div>
                    <div class="info-module flex1" style="height:auto;">

                        <div class="info-module-title">
                            {{ this.stockinfo[this.currentIndex].name + ' ' }}{{ this.stockinfo[this.currentIndex].id }}
                        </div>
                        <div :style="risefallcolor" class="info-module-rate"
                            style="margin-top: 6px; font-weight: 600;float:right; line-height: 16px;">
                            {{ toindex }}
                        </div>
                        <div class="info-module-rate"
                            style="font-size: 14px; margin-top: 12px; font-weight: 600; font-size: 24px;">{{
                            this.stockinfo[this.currentIndex].index
                            }}</div>

                        <div class="info-module-rate flex" style="font-weight: 600;">
                            <div class="flex1" style="text-align: left;">{{ this.stockinfo[this.currentIndex].lowest }}
                            </div>
                            <div style="width: 60px; font-size: 14px; color:#ccc; text-align: center;">←昨日→</div>
                            <div class="flex1" style="text-align: right;">{{ this.stockinfo[this.currentIndex].highest
                            }}
                            </div>
                        </div>

                        <div class="info-module-rate" style="margin-top: 10px;">交易量:
                            {{ this.stockinfo[this.currentIndex].volume }}</div>
                        <div class="info-module-rate">
                            按季净利（亿元）:
                            {{ this.currentStockData[this.currentIndex].n_income.toFixed(2) }}</div>
                        <div class="info-module-rate">
                            按季毛利（亿元）:
                            {{ this.currentStockData[this.currentIndex].revenue.toFixed(2) }}</div>
                        <div class="info-module-rate">
                            销售净利率:
                            {{ this.netprofit_margin }}</div>
                        <div class="info-module-rate">
                            销售毛利率:
                            {{ this.grossprofit_margin }}</div>
                        <div class="info-module-rate">市盈率:
                            {{ this.currentStockData[this.currentIndex].pe.toFixed(2) }}</div>
                        <div class="info-module-rate">市净率:
                            {{ this.currentStockData[this.currentIndex].pb.toFixed(2) }}</div>
                        <div class="info-module-rate">总股本（万）:
                            {{ this.currentStockData[this.currentIndex].total_share.toFixed(2) }}</div>
                        <div class="info-module-rate">流通股本（万）:
                            {{ this.currentStockData[this.currentIndex].float_share.toFixed(2) }}</div>
                        <div class="info-module-rate">
                            总市值（亿元）:
                            {{ this.currentStockData[this.currentIndex].total_mv.toFixed(2) }}</div>
                        <div class="info-module-rate">
                            流通市值（亿元）:
                            {{ this.currentStockData[this.currentIndex].circ_mv.toFixed(2) }}</div>
                    </div>
                </div>
                <div class="mid">
                    <div class="mid-item flex" style="width: calc(100vw - 252px)">
                        <graph></graph>
                    </div>
                    <div class="mid-item" style="background-color: #fff; border: 1px solid RGBA(255, 255, 255, 0.1);">
                        <h3>市场资讯</h3>
                        <div style="margin: 20px; height: 200px">
                            <news :newsinfo="this.newsinfo[this.currentIndex]"></news>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TaskItem from "./taskitem";
import kline from "./kline";
import stockItem from "./stockitem.vue"
import news from "./news.vue"
import loading from "./loading.vue"
import emotionScore from "./emotionScore.vue"
import trend from './trend.vue'
import distribution from './emotionDistribution.vue'
import incomeTrend from './incomeTrend.vue'
import newsStatics from './newsStatics.vue'
import search from './search.vue'
import graph from './knowledgeGraph.vue'


export default {
    name: "stock",
    props: {},
    components: {
        TaskItem: TaskItem,
        kline: kline,
        stockItem: stockItem,
        news: news,
        loading: loading,
        emotionScore: emotionScore,
        trend: trend,
        distribution: distribution,
        incomeTrend: incomeTrend,
        newsStatics: newsStatics,
        search: search,
        graph: graph,
    },
    methods: {

        changeStock(e) {
            this.currentIndex = this.stockinfo.findIndex(item => {
                return item.id === e;
            });
        },
        dateFormat(time) {
            //.log(time);
            var date = new Date(time);
            var year = date.getFullYear();
            /* 在日期格式中，月份是从0开始的，因此要加0
            * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
            * */
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            // 拼接
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        },
        changeType(x) {
            if (this.currentType !== x) {
                this.currentType = x;
                this.loading = true;
                this.request(x.toString());
            }
        },

        request(type) {
            this.$http({
                url: '/api/main/',
                methods: 'get',
                params: {
                    type: type,
                }
            })
                .then(res => {
                    let data = JSON.parse(res.data);
                    let a = [];
                    for (let key in data) {
                        data[key].price = Object.values(JSON.parse(data[key].price));
                        let lastItem = data[key].price[data[key].price.length - 1];

                        a.push({
                            'index': lastItem.close.toFixed(2),
                            'rate': Math.round(lastItem.close / lastItem.open * 10000 - 10000) / 100.00,
                            'name': data[key].name,
                            'id': key.substring(0, 6),
                            'fullId': key,
                            'volume': lastItem.volume,
                            'lowest': lastItem.low.toFixed(2),
                            'highest': lastItem.high.toFixed(2),
                        })
                    }
                    this.stockinfo = a;
                    this.stockData = data;
                    this.loading = false;
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.log(error);
                });

            this.$http({
                url: '/api/news/',
                methods: 'get',
                params: {
                    type: type,
                }
            })
                .then(res => {
                    let newsinfo = [];
                    let temp = Object.values(JSON.parse(res.data));
                    for (let item of temp) {
                        item = Object.values(JSON.parse(item)).reverse();
                        let tempnews = []
                        //console.log(item)
                        for (let tempitem of item) {
                            tempnews.push({ time: tempitem.time, title: tempitem.title, main: tempitem.content, forecast: (tempitem.pos_score - tempitem.neg_score) > 0 ? 1 : 0 })
                        }
                        newsinfo.push(tempnews)
                    }
                    //console.log(newsinfo)
                    this.newsinfo = newsinfo;
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.log(error);
                });



            this.$http({
                url: '/api/industry/',
                methods: 'get',
                params: {
                    type: type,
                }
            })
                .then(res => {
                    let temp = JSON.parse(res.data);
                    let scores = temp.score;
                    let names = Object.values(JSON.parse(temp.name));
                    this.industryScore = scores;
                    this.industryName = names
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.log(error);
                });

            this.$http({
                url: '/api/knowledge/',
                methods: 'get',
            })
                .then(res => {
                    let temp = JSON.parse(res.data)
                    temp.concept = JSON.parse(temp.concept)
                    temp.rate = JSON.parse(temp.rate)
                    temp.stocker = JSON.parse(temp.stocker)
                    this.knowledgeInfo = temp;
                    console.log(temp)
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.log(error);
                });

            this.$http({
                url: '/api/score/',
                methods: 'get',
                params: {
                    type: type,
                }
            })
                .then(res => {
                    let temp = Object.values(JSON.parse(res.data));
                    this.emotionScore = temp;
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.log(error);
                });

            let resCompanyIncome = res => {
                let temp2 = JSON.parse(res);
                let temp //= Object.values(JSON.parse(temp2['600519.XSHG']))
                let incomeData = [];
                let i = 0;
                for (let item of Object.values(temp2)) {
                    temp = Object.values(JSON.parse(item));
                    let temp1 = [];
                    for (let i of temp) {
                        let income, loss;
                        if (i.n_income < 0) {
                            loss = -i.n_income;
                            income = 0;
                        }
                        else {
                            loss = 0;
                            income = -i.n_income;
                        }
                        let tempArray = [i.period, i.revenue / 100000000, income / 100000000, loss / 100000000];
                        temp1.push(tempArray);
                    }
                    incomeData.push(temp1);
                    temp = temp[temp.length - 1];
                    this.currentStockData[i].revenue = temp.revenue / 100000000;
                    this.currentStockData[i++].n_income = temp.n_income / 100000000;
                }

                this.incomeData = incomeData;
                //console.log(incomeData)         
            }

            let resCompanyScore = res => {
                let temp2 = Object.values(JSON.parse(res));
                //let currentStockData = []
                for (let i = 0; i < temp2.length; i++) {
                    let temp = temp2[i]
                    temp = Object.values(JSON.parse(temp));

                    let temp3 = Object.values(temp2)
                    let temp1 = []
                    for (let item of temp3) {
                        temp1.push(Object.values(JSON.parse(item)));
                    }
                    temp = temp[temp.length - 1];
                    let gm = temp.grossprofit_margin, nm = temp.netprofit_margin;
                    gm = gm ? gm : '无', nm = nm ? nm : '无';
                    this.currentStockData[i].grossprofit_margin = gm;
                    this.currentStockData[i].netprofit_margin = nm;
                }
                //let temp = Object.values(JSON.parse(temp2['600519.XSHG']))
            }

            this.$http({
                url: '/api/sub1/',
                methods: 'get',
                params: {
                    type: type,
                }
            })
                .then(res => {
                    let allInfo = JSON.parse(res.data);

                    resCompanyIncome(allInfo['res2']);
                    resCompanyScore(allInfo['res3']);

                    let temp1 = JSON.parse(allInfo['res1']);

                    let i = 0;

                    for (let item of temp1) {
                        let temp = Object.values(JSON.parse(item));
                        if (!temp[0]) {
                            i++;
                            continue;
                        }

                        temp = temp[temp.length - 1];
                        this.currentStockData[i].float_share = temp.float_share;
                        this.currentStockData[i].pb = temp.pb;
                        this.currentStockData[i].pe = temp.pe;
                        this.currentStockData[i].total_mv = temp.total_mv / 10000;
                        this.currentStockData[i].total_share = temp.total_share;
                        this.currentStockData[i++].circ_mv = temp.circ_mv / 10000;
                    }
                })
                .catch(function (error) {
                    // 请求失败处理
                    console.log(error);
                });


        }
    },
    computed: {
        time() {
            let a = new Date().Format("yyyy-MM-dd hh:mm:ss");
            return a;
        },
        risefallcolor() {
            return {
                'color': this.stockinfo[this.currentIndex].rate < 0 ? '#6db' : 'red'
            }
        },
        toindex() {
            let a = this.stockinfo[this.currentIndex].rate.toFixed(2) + '%';
            if (this.stockinfo[this.currentIndex].rate >= 0)
                a = '+'.concat(a);
            return a;
        },
        netprofit_margin() {
            if (typeof (this.currentStockData[this.currentIndex].netprofit_margin) === 'string')
                return this.currentStockData[this.currentIndex].netprofit_margin;
            else if (typeof (this.currentStockData[this.currentIndex].netprofit_margin) === 'number')
                return this.currentStockData[this.currentIndex].netprofit_margin.toFixed(2) + '%';
            else return "未知"
        },
        grossprofit_margin() {
            if (typeof (this.currentStockData[this.currentIndex].grossprofit_margin) === 'string')
                return this.currentStockData[this.currentIndex].grossprofit_margin;
            else if (typeof (this.currentStockData[this.currentIndex].grossprofit_margin) === 'number')
                return this.currentStockData[this.currentIndex].grossprofit_margin.toFixed(2) + '%';
            else return "未知"
        }
    },
    created() {
        this.request('1');
    },
    mounted() {
        let _this = this;  // 声明一个变量指向Vue实例this，保证作用域一致
        this.timer = setInterval(() => {
            _this.date = new Date(); // 修改数据date
        }, 1000);
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    },
    data() {
        return {
            currentStockData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
            incomeData: [],
            stockData: {},
            currentIndex: 0,
            currentType: 1,
            currentTypeStyle: [{ 'color': '#2c2c2c' }, { 'color': '#ccc' }],
            loading: true,
            date: new Date(),
            icon1: "../assets/search_normal.svg",
            icon2: "../assets/advance_normal.svg",
            stockinfo: [],
            news: [
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220516,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220517,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220520,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220524,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220601,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220603
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 0,
                    time: 20220603,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 0,
                    time: 20220615,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220620,
                },
                {
                    title: '工商银行(01398)将于下周二披露中报 大行更新评级及目标价(表)',
                    main: '工商银行(3.99, -0.05, -1.24%)(01398)将于下周二(8月30日)公布今年中期业绩，综合4间券商预测，工行2022年上半年纯利1682.73-1726.52亿元，较2021年上半年纯利1643.73亿，同比上升2.4%至5%;中位数1714.12亿，同比升4.3%。报告中称，综合3间券商预测，工行2022年上半年营业收入4450.78亿元至4515.58亿元，较2021年上半年4264.06亿，同比升4.4%至5.9%。小摩表示，将关注工行今年上半年净息差收窄情况﹐因内地贷款市场报价利率(LPR)下调，关注普惠金融贷款的增加可能会进一步压缩银行的利润率。',
                    forecast: 1,
                    time: 20220620,
                },
            ]
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navi {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    margin: 0;
    padding: 70px 0 0;
    background-color: #ccc;
}

.content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.content-focus-mid {
    width: 100%;
    min-width: 1200px;
    height: 100%;
    display: flex;
    box-sizing: border-box;
}

.right {
    width: 50px;
    display: flex;
}

.mid {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 252px);
    height: auto;
    border-radius: 10px 10px 0 0;

}

.mid-item {
    margin: 2px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid RGBA(255, 255, 255, 0.1);

}

.mid-item h3 {
    line-height: 28px;
    margin: 20px;
}

.mid-item h4 {
    line-height: 28px;
    margin: 20px;
}

.mid-item-mid {
    height: calc(100vh - 922px);
    display: flex;
    margin: 0 2px;
}

.mid-item-mid .item {
    width: calc(30% - 1.5px);
    margin-right: 2px;
    background-color: #fff;
    border-radius: 5px;
    height: 100%;
}

.mid-item-mid .item-short {
    width: calc(20% - 1.5px);
}

.mid-item-mid .emotionrate {
    display: flex;
    height: calc(100vh - 972px);
    width: 100%;
    align-items: center;
    justify-content: center;
}

.mid-item-mid .darking {
    background-color: #2c2c33;
}

.mid-item-mid .darking h3 {
    color: #fff;
    margin-bottom: 0;
}


.mid-item-left {
    background-color: #fff;
    width: calc(50% - 1px);
    border-radius: 5px;

}

.mid-item-right {
    height: 554px;
    background-color: #fff;
    width: calc(50% - 1px);
    border-radius: 5px;
    margin-left: 2px;

}

.mid-bottom-items {
    display: flex;
    width: 100%;
    height: 100% - 60px;
}

.mid-bottom-item {
    height: 100%;
}

.mid-bottom-item-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    margin: 0 20px 10px;
}

.mid-bottom-item-main {
    margin: 0 20px 20px;
    font-size: 12px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    line-height: 16px;
    max-height: 100px;
    /* 超出范围隐藏 */
    overflow: hidden;
}

.mid-bottom-item-forecast {
    margin: 0 20px;
    font-size: 14px;
}

.content h3 {
    margin: 20px;
    color: #2c2c2c;
}

.left {
    width: 250px;
    min-width: 250px;
    height: auto;
    border: 1px solid RGBA(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
}

.info-module {
    width: 100%;
    border-radius: 5px;
    margin: 2px;
    margin-left: 0;
    background-color: #fff;
    overflow: hidden;
}

.info-module-title {
    margin: 20px 20px 10px;
    font-weight: 600;
    font-size: 18px;
}

.info-module-rate {
    margin: 15px 20px 0;
    font-size: 14px;
    font-weight: 600;
}
</style>
