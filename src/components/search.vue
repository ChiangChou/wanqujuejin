<template>
    <div class="h">
        <div class="top">
            <div class="top-left">
                <div class="listIcon">
                    <img src="../assets/list.svg" />
                </div>
                <router-link to="/" class="CrowdName">
                    <span>湾区掘金</span>
                </router-link>
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
</template>
 
<script>
export default {
    name: 'search',
    data() {
        return {
            isSearchFocus: false,
            searchBGC: "rgba(86,44,146, 0.05)",
        }
    },
    methods:{
        searchFocus() {
            this.searchBGC = "#fcfcfc";
            this.isSearchFocus = true;
        },
        searchBlur() {
            this.searchBGC = "rgba(86,44,146, 0.05)";
            this.isSearchFocus = false;
        },
    },
}
</script>
 
 <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h {
    box-sizing: border-box;
    width: 100vw;
    height: 70px;
    margin: -70px 0 0;
    background-color: #fff;
}

.top {
    display: flex;
    padding: 10px 0;
}

.top-left {
    display: flex;
    width: 250px;
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
    color: #2c2c2c;
    margin-left: 10px;
    text-decoration: none;
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
</style>
 