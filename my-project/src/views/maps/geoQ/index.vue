<template>
    <div id="map">GeoQ</div>
</template>

<script>
// import ol from 'ol'
export default {
  data () {
    return {
      map: null
    }
  },
  created () {
    this.initMap()
  },
  methods: {
    initMap () {
    //   let map = null
      let vecLayer = this.initTileLayer()
      let bounds = [8126322.827908971, 356407.7081140086, 15139450.747885207, 7094762.123545771]
      this.map = new ol.Map({
        controls: ol.control.defaults({
          attribution: false
        }),
        target: 'map',
        layers: [vecLayer],
        view: new ol.View({
          minZoom: 0,
          maxZoom: 15,
          extent: bounds
        })
      })
      console.log('map -------------------', this.map, this.map.getSize())
      //   debugger
      this.map.getView()
    //   this.map.getView().fit(bounds, 18)
    },
    initTileLayer () {
      let url = 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
      let layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: url
        })
      })
      return layer
    }
  }
}
</script>
