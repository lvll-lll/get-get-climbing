<template>
  <div class="container">
    <app-header></app-header>
    <map-loader @map-loaded="mapLoaded"></map-loader>
    <div class="layout left">
      <border-box class="box" :title="'工单情况'">
        <chart1 ref="chart1"/>
      </border-box>
      <border-box class="box" :title="'工单来源'">
        <chart2 ref="chart2"/>
      </border-box>
      <border-box class="box" :title="'实时工单量'">
        <chart3 ref="chart3"/>
      </border-box>
      <border-box class="box" :title="'实时超时工单量'">
        <chart4 ref="chart4"/>
      </border-box>
    </div>
    <div class="layout right">
      <border-box class="box" :title="'人员'">
        <chart5 ref="chart5"/>
      </border-box>
      <border-box class="box" :title="'在线率'">
        <chart6 ref="chart6"/>
      </border-box>
      <border-box class="box" :title="'停电率'">
        <chart7 ref="chart7"/>
      </border-box>
      <border-box class="box" :title="'设备台区损率'">
        <chart8 ref="chart8"/>
      </border-box>
    </div>
    <static-box class="static-box"/>
  </div>

</template>

<script>
import MapLoader from '../../components/map-loader'
import BorderBox from '../../components/border-box'
import StaticBox from './modules/static-box'
import AppHeader from './modules/app-header'
import Chart1 from './modules/chart1'
import Chart2 from './modules/chart2'
import Chart3 from './modules/chart3'
import Chart4 from './modules/chart4'
import Chart5 from './modules/chart5'
import Chart6 from './modules/chart6'
import Chart7 from './modules/chart7'
import Chart8 from './modules/chart8'
import DomSize from 'wd-domsize-monitor'

export default {
  name: 'MapPage',
  components: {
    MapLoader,
    BorderBox,
    StaticBox,
    AppHeader,
    Chart1,
    Chart2,
    Chart3,
    Chart4,
    Chart5,
    Chart6,
    Chart7,
    Chart8
  },
  data () {
    return {
      map: null
    }
  },
  methods: {
    mapLoaded (map) {
      this.map = map
      const dom = document.querySelector('.box')
      DomSize.bind(dom, () => {
        this.$refs.chart1.resizeChart()
        this.$refs.chart2.resizeChart()
        this.$refs.chart3.resizeChart()
        this.$refs.chart4.resizeChart()
        this.$refs.chart5.resizeChart()
        this.$refs.chart6.resizeChart()
        this.$refs.chart7.resizeChart()
        this.$refs.chart8.resizeChart()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .layout {
    width: 20rem;
    height: 100%;
    position: absolute;
    top: 0;
    padding: 1rem;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
}

.box {
  width: calc(100% - 1.6rem);
  height: calc(25% - 1.2rem);
  margin-top: 0.5rem;
}

.static-box {
  bottom: 9.3rem;
  left: 28rem;
  width: calc(100% - 56rem);
  height: 8rem;
}
</style>
