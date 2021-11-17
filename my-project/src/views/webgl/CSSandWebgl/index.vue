<template>
  <div>
    <!-- <css-trasform></css-trasform> -->
    <matrix-change></matrix-change>
    <animation-oblong></animation-oblong>
  </div>
</template>

<script>
import cssTrasform from './css-transform.vue'
import MatrixChange from './matrixChange.vue'
import AnimationOblong from './animationOblong.vue'

export default {
  components: { cssTrasform, MatrixChange, AnimationOblong }
}
</script>
