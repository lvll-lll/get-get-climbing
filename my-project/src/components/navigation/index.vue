<script src="../../router/index.js"></script>
<template>
  <div class="navigation-container" ref="nav">
    <ul class="menus">
      <li class="menus-li" v-for="item in list" ref="nav-li"
        :key="item.key"
        @click="handleClick(item)"
        @mouseover="handleMouseOver(item)"
        @mouseleave="handleMouseLeave"
        @mouseenter="handleMouseEnter"
      >{{item.label}}</li>
    </ul>
    <div class="drop-down-list" ref="drop-list" v-if="showChildItems">
      <ul class="drop-ul">
        <li v-for="ul in chlidList" class="drop-li"
          :key="ul.key"
          @click="handleClick(ul)"
        >{{ul.label}}</li>
        <li>11</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { env } from 'echarts'
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
      showChildItems: false,
      chlidList: [],
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
      console.log(item)
      if(item.chlid && item.chlid.length > 0) {
        this.showChildItems = true
        this.chlidList = item.chlid
        this.$refs['drop-list'].style.setProperty("--height", item.chlid.length * 40 + 'px');
        this.$refs['nav'].style.setProperty("--navHeight", 68 + item.chlid.length * 40 + 'px');
      }
    },
    handleMouseEnter(event) {
      console.log(event)
      let x = event.currentTarget.offsetLeft + 'px'
      let y = event.currentTarget.offsetHeight + event.currentTarget.offsetTop + 'px'
      this.$refs['nav'].style.setProperty("--x", x);
      this.$refs['nav'].style.setProperty("--y", y);
    },
    handleMouseLeave() {
      this.showChildItems = false
      // this.$refs['nav'].style.setProperty("--navHeight", 'unset');
    }
  }
}
</script>

<style scoped lang="scss">
.navigation-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: white;
  // height: 68px;
  height: var(--navHeight);
  line-height: 68px;
  width: 100%;
  position: fixed;
  z-index: 999;
  background: rgba(255,255,255,0.4);
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.menus {
  overflow: hidden;
  .menus-li {
    float: right;
    height: 20px;
    line-height: 20px;
    // cursor: pointer;
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
.drop-down-list{
  width: 85px;
  position: absolute;
  left: var(--x);
  top: var(--y);
  background: rgba(255,255,255,0.4);
  z-index: 999;
  height: var(--height);
  .drop-ul{
    width: 100%;
    .drop-li{
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
