<template>
  <div>
    <drawPolygon></drawPolygon>
    <colorPolygon></colorPolygon>
    <animationPolygon></animationPolygon>
    <threeDObjects></threeDObjects>
  </div>
</template>

<script>
import drawPolygon from './purePolygon/drawPolygon.vue'
import colorPolygon from './colorPolygon/colorPolygon.vue'
import animationPolygon from './animationPolygon/index.vue'
import threeDObjects from './3DObjects/index.vue'
export default {
  components: {drawPolygon, colorPolygon, animationPolygon, threeDObjects}
}
</script>
