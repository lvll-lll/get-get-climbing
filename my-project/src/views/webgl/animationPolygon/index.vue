<template>
    <canvas id="p-a"></canvas>
</template>

<script>
import { initAnimationPolygon } from './index'
export default {
  mounted () {
    initAnimationPolygon('#p-a')
  }
}
</script>
