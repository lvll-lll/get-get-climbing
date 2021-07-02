<template>
  <div class="navigation-container">
    <ul>
      <li v-for="item in list"
          :key="item.key"
          @click="handleClick(item)">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { key: 'transfer', label: 'transfer', router: '/transfer' }
      ]
    }
  },
  methods: {
    handleClick (item) {
      this.$router.push(item.router)
    }
  }
}
</script>

<style scoped>
.navigation-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  height: 68px;
  line-height: 68px;
  /* position: fixed; */
  width: 100%;
}
</style>
