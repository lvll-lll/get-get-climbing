<template>
  <div class="navigation-container">
    <el-dropdown class="nav-drop-down" v-for="item in list" :key="item.key" @command="handleCommand">
      <span class="el-dropdown-link">
        {{item.label}}
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item  v-for="menu in item.menu" :key="menu.key" :command="menu.router">{{item.label + '-' +menu.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { key: 'components',
          label: '组件',
          menu: [
            { key: 'transfer', label: 'Transfer', router: '/transfer' }
          ]
        },
        { key: 'maps',
          label: '地图',
          menu: [
            { key: 'GeoQ', label: 'GeoQ', router: '/maps' }
          ]
        }
      ]
    }
  },
  methods: {
    handleCommand (item) {
      this.$router.push(item)
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
  position: fixed;
  width: 100%;
  text-align: right;
}
.nav-drop-down{
  margin: 0 68px;
  cursor: pointer;
}
</style>
