<template>
    <div id="navi">
        <div class="h">
            <div class="top">
                <div class="top-left">
                    <div class="listIcon">
                        <img src="../assets/list.svg" />
                    </div>
                    <div class="CrowdName">
                        <span>湾区掘金</span>
                    </div>
                </div>
                <div class="search" :class="{ searchfocus: isSearchFocus }">
                    <div class="icon">
                        <img src="../assets/search_normal.svg" />
                    </div>
                    <input type="text" placeholder="搜索信息" @focus="searchFocus" @blur="searchBlur" />
                    <div class="icon">
                        <img src="../assets/advance_normal.svg" />
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-focus-mid">
                <div class="left">
                    <h3>热门</h3>
                    <stockItem :stockinfo="this.stockinfo1"></stockItem>
                    <stockItem :stockinfo="this.stockinfo2"></stockItem>
                    <stockItem :stockinfo="this.stockinfo3"></stockItem>
                </div>
                <div class="mid">
                    <h3>市场走势</h3>
                    <kline></kline>
                    <h3>市场信心</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TaskItem from "./taskitem";
import kline from "./kline";
import stockItem from "./stockitem.vue"

export default {
    name: "navi",
    props: {},
    components: {
        TaskItem: TaskItem,
        kline: kline,
        stockItem: stockItem,
    },
    methods: {
        searchFocus() {
            this.searchBGC = "#f5f5f5";
            this.isSearchFocus = true;
        },
        searchBlur() {
            this.searchBGC = "#e5e5f0";
            this.isSearchFocus = false;
        },
    },
    computed: {

    },
    data() {
        return {
            searchBGC: "#e5e5f0",
            isSearchFocus: false,
            isleftFocus: [true, false, false, false],
            icon1: "../assets/search_normal.svg",
            icon2: "../assets/advance_normal.svg",
            stockinfo1: {
                id: '000000',
                name: '贵州茅台',
                index: '998.00',
                rate: 0.5,
            },
            stockinfo2: {
                id: '000001',
                name: '工商银行',
                index: '999.00',
                rate: -0.5,
            },
            stockinfo3: {
                id: '000002',
                name: '中国平安',
                index: '1000.00',
                rate: 3,
            },
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navi {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 70px 0 0;
}

.h {
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    margin: -70px 0 0;
}

.top {
    display: flex;
    padding: 10px 0;
}

.top-left {
    display: flex;
    width: 250px;
}

.content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: linear-gradient(to bottom, #304070 30%, #506090 50%, #8090b0 70%, #f5f5f5);
}

.content-focus-mid {
    width: 50%;
    min-width: 1200px;
    height: 100%;
    display: flex;
    padding-top: 20px;
    box-sizing: border-box;
}

.right {
    width: 50px;
    display: flex;
}

.mid {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: auto;
    border-radius: 10px 10px 0 0;
    background-color: RGBA(255, 255, 255, 0.05);
    margin-left: 20px;
    border: 1px solid RGBA(255, 255, 255, 0.1);
}

.content h3 {
    margin: 20px;
    color: #f8f8f8;
}

.left {
    width: 250px;
    min-width: 250px;
    height: auto;
    background-color: RGBA(255, 255, 255, 0.05);
    border-radius: 10px 10px 0 0;
    border: 1px solid RGBA(255, 255, 255, 0.1);
}

.left-item {
    height: 36px;
    width: 90%;
    display: flex;
    align-items: center;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    font-size: 16px;
}

.left-item span {
    line-height: 36px;
    color: #515151;
}

.left-item img {
    margin: 0 20px;
}

.left-item:hover {
    background-color: #ddd;
}

.left-item:focus {
    background-color: #def;
    font-weight: 600;
}

.left-item span::before {
    content: "";
    width: 0;
    height: 100%;
    display: inline-block;
    position: relative;
    vertical-align: middle;
}

.listIcon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
}

.listIcon~div {
    height: 50px;
}

.listIcon img {
    height: 24px;
    width: auto;
}

.listIcon:hover {
    background-color: #d5d5d5;
    border-radius: 50%;
}

.CrowdName {
    display: flex;
    align-items: center;
    width: auto;
    font-size: 24px;
    color: #515151;
    margin-left: 10px;
}

.search {
    display: flex;
    background-color: v-bind(searchBGC);
    border-radius: 5px;
    transition: 0.3s;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 25px;
}

.search input {
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 16px;
    width: 600px;
}

.searchfocus {
    box-shadow: 0 1px 2px 1px #aaa;
    transition: 0.3s;
}

.icon {
    display: flex;
    align-items: center;
    padding: 10px;
    margin: 5px 10px;
}

.icon:hover {
    background-color: #d5d5d5;
    border-radius: 50%;
}

.tasks {
    display: flex;
    width: 100%;
    background-color: #222;
}
</style>
