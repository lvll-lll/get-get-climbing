<template>
    <canvas id="p-color">webgl</canvas>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import {initColorPolygon} from './colorPolygon'
import '../global.css'
export default {
  mounted () {
    initColorPolygon('#p-color')
  },
  methods: {}
}
</script>