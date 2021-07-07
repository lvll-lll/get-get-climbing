<template>
<div ref="map" class="map"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import DomSize from 'wd-domsize-monitor'
const style = require('./style.json')

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
      map: null,
      popup: null
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
        that.popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: true,
          className: 'my-popup',
          offset: [0, -15],
          anchor: 'bottom'
        })
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
      // 高亮展示
      that.map.addSource('buildings-highlight', {
        type: 'geojson',
        data: that.getGeojson()
      })
      that.map.addLayer({
        'id': '3d-buildings-highlight',
        'source': 'buildings-highlight',
        'type': 'fill-extrusion',
        'paint': {
          'fill-extrusion-color': '#00f',
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
      that.map.on('click', function (e) {
        const coords = e.lngLat
        const r = [
          [e.point.x - 5, e.point.y - 5],
          [e.point.x + 5, e.point.y + 5]
        ]
        const features = that.map.queryRenderedFeatures(r, {})
        const feature = features[0]
        that.map.getSource('buildings-highlight').setData(feature)
        const description = `
          <h5>${feature.properties.floor}</h5>
          <ul>
            <li>温度： 20℃</li>
            <li>湿度： 52%</li>
            <li>降水： 1mm</li>
            <li>风速： 4m/s</li>
            <li>风向： 无持续风向</li>
          </ul>
        `
        that.popup.setLngLat(coords)
          .setHTML(description)
          .addTo(that.map)
        that.popup.on('close', () => {
          that.map.getSource('buildings-highlight').setData(that.getGeojson())
        })
      })
    },
    getGeojson (features = []) {
      return {
        type: 'FeatureCollection',
        features: features
      }
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
<style lang="scss">
.my-popup {
  color: white;
  $black65: rgba(0, 0, 0, 0.65);
  .mapboxgl-popup-content {
    background-color: $black65;
    margin: 0;
    padding: 8px;
    white-space: nowrap;
    font-size: 12px;
    h5 {
      margin: 0 0 3px 0;
      padding: 3px 0;
      font-size: 14px;
    }
    label {
      display: inline-block;
      text-align: right;
      width: 65px;
    }
  }
  .mapboxgl-popup-tip {
    border-top-color: $black65 !important;
  }
  .mapboxgl-popup-close-button {
    color: white;
    position: absolute;
    top: 0.3rem;
    font-size: 1rem;
    outline: none;
  }
}
</style>
