<script src="../../router/index.js"></script>
<template>
  <div class="navigation-container">
    <ul class="menus">
      <li class="menus-li" v-for="item in list"
        :key="item.key"
        @click="handleClick(item)"
        @mouseover="handleMouseOver(item)"
        @mouseleave="handleMouseLeave"
      >{{item.label}}
      <ul class="child-ul" v-if="showChildItems">
      <li v-for="ul in chlidList"
        :key="ul.key"
        @click="handleClick(ul)"
      >{{ul.label}}</li>
    </ul></li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { key: 'task', label: 'task', router: '/task', chlid: [] },
        { key: 'transfer', label: 'transfer', router: '/transfer', chlid: [] },
        { key: 'map', label: 'map', router: '/map', chlid: [] },
        { key: 'webgl', label: 'webgl', router: '/webgl',
          chlid: [
            { key: 'map', label: 'map', router: '/map' },
            { key: 'transfer', label: 'transfer', router: '/transfer' },
          ]
        }
      ],
      showChildItems: false
    }
  },
  methods: {
    handleClick (item) {
      if(this.$route.path === item.router) {
        return
      }
      this.$router.push(item.router)
    },
    handleMouseOver(item, event) {
      if(item.chlid && item.chlid.length > 0) {
      this.showChildItems = true
      this.chlidList = item.chlid
      }
    },
    handleMouseLeave() {
      this.showChildItems = false
    }
  }
}
</script>

<style scoped lang="scss">
.navigation-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: white;
  height: 68px;
  line-height: 68px;
  width: 100%;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.menus {
  overflow: hidden;
  .menus-li {
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
    .child-ul{
      position: absolute;
    }
  }
}
</style>
