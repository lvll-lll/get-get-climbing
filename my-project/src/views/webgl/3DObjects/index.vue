<template>
    <canvas id="threeD"></canvas>
</template>

<script>
import { color } from 'echarts'
import { mat4 } from 'gl-matrix'
import { main } from './index'
// import { drawScene } from '../animationPolygon/index'
export default {
  data () {
    return {
      squareRotation: 0,
      cubeRotation: 0.0
    }
  },
  mounted () {
    // this.initCanvas()
    main()
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
      let vsSource = this.initShader()['vsSource']
      let fsSource = this.initShader()['fsSource']

      let shaderProgram = this.initShaderProgram(gl, vsSource, fsSource)

      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPostion'),
          vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
        }
      }
      let buffer = this.init3DBuffer(gl)

      let then = 0
      const _that = this
      function render (now) {
        now *= 0.001
        let deltaTime = now - then
        then = now
        // console.log('drawscene', _that.drawScene)

        _that.drawScene(gl, programInfo, buffer, deltaTime)
        _that.squareRotation += deltaTime

        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    },
    init3DBuffer (gl) {
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      const position = [
        // Front face
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0
      ]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)
      const faceColor = [
        [1.0, 1.0, 1.0, 1.0], // Front face: white
        [1.0, 0.0, 0.0, 1.0], // Back face: red
        [0.0, 1.0, 0.0, 1.0], // Top face: green
        [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0], // Right face: yellow
        [1.0, 0.0, 1.0, 1.0] // Left face: purple
      ]
      let colors = []
      for (let j = 0; j < faceColor.length; j++) {
        const c = faceColor[j]
        colors = colors.concat(c, c, c, c)
      }
      const colorBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW)

      const indexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      const indices = [
        0, 1, 2, 0, 2, 3, // front
        4, 5, 6, 4, 6, 7, // back
        8, 9, 10, 8, 10, 11, // top
        12, 13, 14, 12, 14, 15, // bottom
        16, 17, 18, 16, 18, 19, // right
        20, 21, 22, 20, 22, 23 // left
      ]
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
      return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer
      }
    },
    initShaderProgram (gl, vsSource, fsSource) {
      let vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource)
      let fragShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
      let shaderProgram = gl.createProgram()
      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragShader)
      gl.linkProgram(shaderProgram)
      return shaderProgram
    },
    loadShader (gl, type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
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
            vColor = aVertexColor;
        }
      `
      const fsSource = `
        varying lowp vec4 vColor;
        
        void main(void) {
            gl_FragColor = vColor;
        }
      `
      return {vsSource: vsSource, fsSource: fsSource}
    },
    drawScene (gl, paramInfo, buffers, deltaTime) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clearDepth(1.0)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      const fieldOfView = 45 * Math.PI * 180
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
      const zNear = 0.1
      const zFar = 100.0
      const projectionMatrix = mat4.create()
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

      const modelViewMatrix = mat4.create()
      mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0])
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation, [0, 0, 1])
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation, [0, 1, 0])

      {
        const numComponents = 3
        const type = gl.FLOAT
        const normalize = false
        const stride = 0
        const offset = 0
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
        gl.vertexAttribPointer(
          paramInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset)
        gl.enableVertexAttribArray(
          paramInfo.attribLocations.vertexPosition)
      }
      {
        const numComponents = 4
        const type = gl.FLOAT
        const normalize = false
        const stride = 0
        const offset = 0
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
        gl.vertexAttribPointer(
          paramInfo.attribLocations.vertexColor,
          numComponents, type, normalize, stride, offset
        )
        gl.enableVertexAttribArray(paramInfo.attribLocations.vertexColor)
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
      gl.useProgram(paramInfo.program)
      gl.uniformMatrix4fv(paramInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
      gl.uniformMatrix4fv(paramInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)
      {
        const vertextCount = 36
        const type = gl.UNSIGNED_SHORT
        const offset = 0
        gl.drawElements(gl.TRIANGLES, vertextCount, type, offset)
      }
      this.cubeRotation += deltaTime
    }
  }
}
</script>
