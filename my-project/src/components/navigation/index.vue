<script src="../../router/index.js"></script>
<template>
  <div class="navigation-container">
    <ul class="menus">
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
        { key: 'transfer', label: 'transfer', router: '/transfer' },
        { key: 'map', label: 'map', router: '/map' }
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

<style scoped lang="scss">
.navigation-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  height: 68px;
  line-height: 68px;
  width: 100%;
}
.menus {
  overflow: hidden;
  li {
    float: right;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    width: 85px;
    border-right: 2px solid #1da1f2;
    text-align: center;
    margin-top: 25px;
    &:first-child {
      border-right: none;
    }
  }
}
</style>
