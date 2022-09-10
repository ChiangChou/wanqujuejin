<template>
    <div id="navi">
        <search></search>
        <div class="mainIntro">
            <div class="mainIntroText flexCenter flexColumn">
                <h1>基于HAN模型创新算法的新闻舆情分析系统</h1>
                <p>实时监控金融舆情走向，研判舆情趋势，为投资决策提供信息支撑</p>
                <router-link to="/stock" class="mainIntroButton flexCenter">开始使用</router-link>
            </div>
        </div>
        <div class="mainIntro">
            <wave></wave>
        </div>
        <div class="advantageIntro flexCenter main">
            <div class="advantageSubintro flexCenter flexColumn">
                <h3>实时数据 快人一步</h3>
                <p>实时搜集新闻数据，快速呈现舆情信息</p>
            </div>
            <div class="advantageSubintro flexCenter flexColumn">
                <h3>信息甄别 智能推荐</h3>
                <p>通过深度学习判别新闻舆情倾向，聚焦市场热点</p>
            </div>
            <div class="advantageSubintro flexCenter flexColumn">
                <h3>风险预警 防患未然</h3>
                <p>后台研判风险舆情，即时提供预警信息</p>
            </div>
        </div>

        <div style="height: 200px;" class="flexCenter main">
            <h1>金融舆情分析可视化</h1>
        </div>
        <div class="flexCenter main" style="align-items: start;">
            <div class="functionSubintro flexCenter flexColumn">
                <img src="../assets/news.svg">
                <h3>热点聚焦</h3>
                <p>实时同步新闻数据，通过智能系统研判热点、预警数据，呈现最新鲜、最及时的金融新闻焦点，帮助投资者掌控市场动态</p>
            </div>
            <div class="functionSubintro flexCenter flexColumn">                
                <img src="../assets/statics.svg">
                <h3>综合报表</h3>
                <p>可视化综合报表型页面，展示能够反映上市公司的经营状况信息、金融舆情分析得出的情绪指标、传统股票行情数据等相关信息，为投资者提供最直观、最全面的行情数据</p>
            </div>
            <div class="functionSubintro flexCenter flexColumn">
                <img src="../assets/knowledgeGraph.svg">
                <h3>知识图谱</h3>
                <p>采用知识图谱的方式，展示在受到金融舆情冲击之下，股票之间的联系以及各自的分布情况，形式直观，便于理解与分析</p>
            </div>
        </div>
        <div class="flexCenter main" style="align-items: start;">
            <div class="functionSubintro flexCenter flexColumn">
                <router-link to="/hotwarn" class="jumpTo flexCenter">
                    <img src="../assets/right.svg">
                </router-link>
                <p></p>
            </div>
            <div class="functionSubintro flexCenter flexColumn">
                <router-link to="/stock" class="jumpTo flexCenter">
                    <img src="../assets/right.svg">
                </router-link>
                <p></p>
            </div>
            <div class="functionSubintro flexCenter flexColumn">
                <router-link to="/knowledge" class="jumpTo flexCenter">
                    <img src="../assets/right.svg">
                </router-link>
                <p></p>
            </div>
        </div>
        <div class="flexCenter flexColumn main"
            style="height: 150px; border-top: 1px solid #ccc; background-color: #fafafa;">
            <h1>我们的优势</h1>
        </div>
        <div class="mainIntro staticsIntro main">
            <div class="flex"  style="width: 66vw;">
            <div class="staticsSubintro flexCenter flexColumn">
                <h1>时效性</h1>
                <p><span style="font-weight: 600; font-size: 32px;">7*24</span><span>&nbsp小时全天候数据追踪</span></p>
            </div>
            <div class="staticsSubintro flexCenter flexColumn">
                <h1>高精度</h1>
                <p><span>超过经典深度学习模型&nbsp</span><span style="font-weight: 600; font-size: 32px;">8%</span></p>
            </div>
            <div class="staticsSubintro flexCenter flexColumn">
                <h1>大样本</h1>
                <p><span style="font-weight: 600; font-size: 32px;">1000000+</span><span>&nbsp条数据支撑模型</span></p>
            </div>
        </div>
        </div>
        <div class="flexCenter flexColumn main"
            style="height: 150px; border-top: 1px solid #ccc; background-color: #fafafa;">
            <h1>快速使用</h1>
        </div>
        <div class="flexCenter flexColumn main" style="margin-top: 30px;">
            <div class="flex useButton">
                <div class="flex1 flexCenter flexColumn">
                    <router-link to="/hotwarn" class="imgContainer flexCenter">
                        <img src="../assets/hot.svg">
                    </router-link>
                    <h3>热点聚焦</h3>
                </div>
                <div class="flex1 flexCenter flexColumn">
                    <router-link to="/stock" class="imgContainer flexCenter">
                        <img src="../assets/stasticPlatform.svg">
                    </router-link>
                    <h3>综合数据平台</h3>
                </div>
                <div class="flex1 flexCenter flexColumn">
                    <router-link to="/knowledge" class="imgContainer flexCenter">
                        <img src="../assets/knowledgeGraph2.svg">
                    </router-link>
                    <h3>知识图谱</h3>
                </div>
            </div>
        </div>

    </div>
</template>
 
<script>
import search from './search.vue'
import wave from './wave.vue'

export default {
    name: 'loading',
    components: {
        search: search,
        wave: wave,
    },
    data() {
        return {

        }
    }
}
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

.router-link{
    text-decoration: none;
}

.main {
    width: 100vw;
}

.mainIntro {
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100vw;
    height: 20vh;
    background-color: #2c2c2c;
    color: #fff;
}

.mainIntro h1 {
    margin-bottom: 0;
}

.mainIntroText {
    text-align: center;
}

.mainIntroButton{
    background-color: #f8f8f8;
    border-radius: 5px;
    height: 36px;
    width: 100px;
    color: #2c2c2c;
    font-weight: 600;
    font-size: 14px;
    margin-top: 10px;
    transition: 0.3s;
    text-decoration: none;
}

.mainIntroButton:hover{
    box-shadow: 0 0 10px #fff;
}

.advantageIntro {
    height: 150px;
    border-bottom: 1px solid #ccc;
}

.advantageSubintro {
    margin: 0 45px;
}

.advantageSubintro h3 {
    margin: 0;
}

.advantageSubintro p {
    font-size: 14px;
}

.staticsIntro {
    height: 400px;
    width: 100vw;
    background-image: url('~@/assets/pexels-adrien-olichon-2387818.jpg');
    align-items: center;

}

.functionSubintro {
    margin: 0 45px 30px;
    justify-content: start;
}

.functionSubintro img {
    width: 60px;
    height: 60px;
    transition: 0.5s;
}

.functionSubintro p {
    width: 275px;
    text-align: left;
    font-size: 14px;
}

.jumpTo {
    width: 72px;
    height: 72px;
}

.jumpTo img:hover {
    transform: scale(1.2);
}

.useButton {
    margin-bottom: 50px;
    min-width: 1000px;
    width: 50vw;
    height: 300px;
}

.useButton .imgContainer {
    width: 220px;
    height: 220px;
}

.useButton img {
    width: 200px;
    height: 200px;
    transition: 0.5s;
}

.useButton img:hover {
    transform: scale(1.1);
}

.staticsSubintro {
    color: '#fff';
    text-align: center;
    flex: 1
}

.staticsSubintro h1 {
    text-align: center;
}
</style>
 