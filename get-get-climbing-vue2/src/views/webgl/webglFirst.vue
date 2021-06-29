<template>
    <!-- <div>webgl first page</div> -->
    <canvas id="c"></canvas>
</template>

<script>
export default {
  mounted () {
    this.drawCanvas()
  },
  methods: {
    drawCanvas () {
      let canvas = document.querySelector('#c')
      let gl = canvas.getContext('webgl')
      if (!gl) {
        console.log('you do not use webgl')
      }
      console.log('start use webgl')
    }
  }
}
</script>
