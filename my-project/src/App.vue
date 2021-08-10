<template>
  <div id="app">
    <!-- <navigation></navigation> -->
    <div class="app-main">
      <navigation></navigation>
      <router-view />
    </div>

  </div>
</template>

<script>
import navigation from '@/components/navigation/index.vue'
export default {
  components: { navigation },
  name: 'App'
}
</script>

<style lang="scss">
body,
html,
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // background-color: #eeeded;
  background-color: white;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
ul {
  margin: 0;
  list-style: none;
  padding: 0;
}
li {
  cursor: pointer;
}
.app-main {
  // height: calc(100% - 68px);
  height: 100%;
  width: 100%;
  // background: white;
}
</style>
