<template>
  <div id="app">
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

<style>
body,
html,
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #eeeded;
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
  background: aliceblue;
  top: 68px;
  position: absolute;
  width: 100%;
}
</style>
