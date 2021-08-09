<template>
    <div id="threeD"></div>
</template>

<script>
import { drawScene } from '../animationPolygon/index'
export default {
  data () {
    return {
      squareRotation: 0
    }
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    initCanvas () {
      let canvas = document.querySelector('#threeD')
      let gl = canvas.getContext('webgl')
      if (!gl) {
        console.log('the device is not support webgl')
        return null
      }
      //   return gl
      this.initProgram(gl)
    },
    initProgram (gl) {
      let vsSource = this.initShader('vsSource')
      let fsSource = this.initShader('fsSource')

      let shaderProgram = this.initShaderProgram(gl, vsSource, fsSource)

      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
        }
      }
      let buffer = this.init3DBuffer(gl)

      let then = 0
      function render (now) {
        now *= 0.001
        let deltaTime = now - then
        then = now

        drawScene(gl, programInfo, buffer)
        this.squareRotation += deltaTime

        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    },
    init3DBuffer (gl) {},
    initShaderProgram (gl, vsSource, fsSource) {
      let vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource)
      let fragShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
      let shaderProgram = gl.createProgram()
      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragShader)
      gl.linkProgram(shaderProgram)
    },
    loadShader (gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.complieShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPLIE_STATUS)) {
        console.log('An error' + gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    },
    initShader () {
      const vsSource = `
        attribute vec4 aVertexPostion;
        attribute vec4 aVertexColor;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        varying lowp vec4 vColor;
        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPostion;
            vColor = vColor;
        }
      `
      const fsSource = `
        varying lowp vec4 vColor;
        void main(void) {
            gl_FragColor = vColor;
        }
      `
      return {vsSource, fsSource}
    }
  }
}
</script>
