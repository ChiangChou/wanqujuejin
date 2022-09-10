<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
   
}
}
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}

#app {
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 100%;
  font-family: Consolas, Menlo, Monaco, 'Courier New', 'PingFang SC',
    'Microsoft YaHei', monospace;
}

.flex {
  display: flex;
}

.flex1 {
  flex: 1;
}

.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flexColumn{
  flex-direction: column;
}

</style>
