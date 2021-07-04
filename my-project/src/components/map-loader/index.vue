<template>
<div ref="map" class="map"></div>
</template>

<script>
import DomSize from 'wd-domsize-monitor'
const style = require('./style.json')
export default {
  name: 'MapLoader',
  props: {
    center: {
      type: Array,
      default () {
        return [104.6349, 34.6446]
      }
    },
    zoom: {
      type: Number,
      default () {
        return 3.5
      }
    }
  },
  data () {
    return {
      map: null
    }
  },
  computed: {},
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      const that = this
      const dom = that.$refs.map
      that.map = new mapboxgl.Map({
        container: dom,
        maxZoom: 18,
        minZoom: 0,
        zoom: that.zoom,
        center: that.center,
        style: style,
        attributionControl: false,
        trackResize: true
      })

      that.map.on('load', () => {
        DomSize.bind(dom, () => {
          that.map.resize()
        })
        that.$emit('map-loaded', that.map)
      })
      window.map = that.map
    }
  }
}
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
