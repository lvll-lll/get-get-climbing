<template>
    <canvas id="c">webgl</canvas>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import {initWebGL} from './pureColorPolygon'
import '../global.css'
export default {
  mounted () {
    initWebGL()
  },
  methods: {}
}
</script>