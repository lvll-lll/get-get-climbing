<template>
  <map-loader @map-loaded="mapLoaded"/>
</template>

<script>
import MapLoader from '../../components/map-loader'
export default {
  name: 'MapPage',
  components: {
    MapLoader
  },
  data () {
    return {
      map: null
    }
  },
  methods: {
    mapLoaded (map) {
      this.map = map
    }
  }
}
</script>

<style scoped>

</style>
