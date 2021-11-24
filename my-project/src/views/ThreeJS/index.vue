<template>
  <div>three js</div>
</template>
<script>
import * as THREE from 'three'
export default {
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const scene = new THREE.Scene()
      console.log(scene)
    }
  }
}
</script>
