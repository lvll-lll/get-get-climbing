<template>
  <div>
    <drawPolygon></drawPolygon>
    <colorPolygon></colorPolygon>
    <!-- <animationPolygon></animationPolygon> -->
  </div>
</template>

<script>
import drawPolygon from './purePolygon/drawPolygon.vue'
import colorPolygon from './colorPolygon/colorPolygon.vue'
import animationPolygon from './animationPolygon/index.vue'
export default {
  components: {drawPolygon, colorPolygon, animationPolygon}
}
</script>
