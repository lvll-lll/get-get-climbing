<template>
  <div>
    <!-- <drawPolygon></drawPolygon> -->
    <colorPolygon></colorPolygon>
    <!-- <animationPolygon></animationPolygon> -->
    <!-- <threeDObjects></threeDObjects> -->
    <!-- <threeDObjectsTexture></threeDObjectsTexture> -->
    <!-- <threedDLighting></threedDLighting> -->
    <!-- <animationTexture></animationTexture> -->
  </div>
</template>

<script>
import drawPolygon from './purePolygon/drawPolygon.vue'
import colorPolygon from './colorPolygon/colorPolygon.vue'
import animationPolygon from './animationPolygon/index.vue'
import threeDObjects from './3DObjects/index.vue'
import threeDObjectsTexture from './3dObjectsTexture/index.vue'
import threedDLighting from './6Lighting/index.vue'
import animationTexture from './7AnimationTexture/index.vue'
export default {
  components: {drawPolygon, colorPolygon, animationPolygon, threeDObjects, threeDObjectsTexture, threedDLighting, animationTexture}
}
</script>
