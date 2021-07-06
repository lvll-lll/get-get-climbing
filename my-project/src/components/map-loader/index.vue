<template>
<div ref="map" class="map"></div>
</template>

<script>
import DomSize from 'wd-domsize-monitor'
const style = require('./style.json')
const buildsData = require('../../assets/data/buildings.json')

export default {
  name: 'MapLoader',
  props: {
    center: {
      type: Array,
      default () {
        return [113.8834, 22.5425]
      }
    },
    zoom: {
      type: Number,
      default () {
        return 13.381
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
        // zoom: that.zoom,
        // center: that.center,
        center: [121.507674, 31.223043],
        pitch: 65.59312320916906,
        zoom: 15.4,
        style: style,
        attributionControl: false,
        trackResize: true
      })

      that.map.on('load', () => {
        DomSize.bind(dom, () => {
          that.map.resize()
        })
        that.$emit('map-loaded', that.map)
        that.addBuilds()
      })
      window.map = that.map
    },
    addBuilds () {
      const that = this
      that.map.addSource('buildings', {
        type: 'geojson',
        data: 'static/data/buildings.json'
      })
      that.map.addLayer({
        'id': '3d-buildings',
        'source': 'buildings',
        'type': 'fill-extrusion',
        'paint': {
          'fill-extrusion-color': '#eee',
          'fill-extrusion-height': ['get', 'floor'],
          'fill-extrusion-opacity': 0.65
        }
      })
      that.map.on('mouseover', '3d-buildings', evt => {
        that.map.getCanvasContainer().style.cursor = 'pointer'
      })
      that.map.on('mouseleave', '3d-buildings', evt => {
        that.map.getCanvasContainer().style.cursor = ''
      })
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
