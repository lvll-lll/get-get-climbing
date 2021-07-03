<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <navigation></navigation>
    <div class="app-main">
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
  /* color: #2c3e50; */
  background-color: #eeeded;
  /* margin-top: 60px; */
  margin: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}
ul {
  margin: 0;
  list-style: none;
}
li {
  cursor: pointer;
}
.app-main {
  height: calc(100% - 68px);
  width: 100%;
}
</style>
