<template>
<div id="app">
  <stock />
</div>
</template>

<script>
import login from './components/login.vue'
import navi from './components/navigator.vue'
import kline from './components/kline.vue'
import stock from './components/stock.vue'

export default {
  name: 'App',
  components: {
    login,
    navi,
    kline,
    stock,
  }
}
</script>

<style>
body, html{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
  height: 100%;
}
</style>
