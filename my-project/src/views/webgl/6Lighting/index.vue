<template>
    <div>
        <canvas id="lighting"></canvas>
    </div>
</template>

<script>
import img from '@/views/webgl/3dObjectsTexture/gansu.png'
import {mat4} from 'gl-matrix'
// 光源
export default {
  /**
     * 光源问题：
     * 1. 需要在每个顶点信息中加入面的朝向发现，这个发现是一个垂直于该顶点所在平面的法线
     * 2. 需要明确方向光的传播方向，可以使用一个方向向量来定义
     */
  data () {
    return {
      squareRotation: 0,
      cubeRotation: 0.0,
      img: img
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const canvas = document.querySelector('#lighting')
      const gl = canvas.getContext('webgl')
      if (!gl) {
        console.log('the device is not support webgl')
        return null
      }
      this.initProgram(gl)
    },
    initProgram (gl) {
      let vsSource = this.initShader()['vsSource']
      let fsSource = this.initShader()['fsSource']

      let shaderProgram = this.initShaderProgram(gl, vsSource, fsSource)
      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord')
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram, 'uSampler')
        }
      }

      const buffer = this.init3DBuffer(gl)

      const texture = this.loadTexture(gl, this.img)

      let then = 0
      const _that = this
      function render (now) {
        now *= 0.001
        let deltaTime = now - then
        then = now

        _that.drawScene(gl, programInfo, buffer, texture, deltaTime)
        _that.squareRotation += deltaTime

        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    },
    drawScene (gl, paramInfo, buffers, texture, deltaTime) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clearDepth(1.0)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      /**
       * 摄像机透视矩阵
       */
      const fieldOfView = 45 * Math.PI / 180 // 45度视图视角
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight // 图像宽高比
      const zNear = 0.1 // zNear和zFar：指定在摄像机距离0.1到100单位长度的范围内的物体可见
      const zFar = 100.0
      const projectionMatrix = mat4.create()
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

      const modelViewMatrix = mat4.create() // set the drawing position to the 'identity' point,which is the center of the scene
      // move the drawing position a bit to where we want to start drawing the square,
      // 这里放置在距离摄像机6个单位的距离
      mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0])
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation, [0, 0, 1]) // 绕z轴旋转
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation * 0.7, [0, 1, 0]) // 绕y轴旋转
      mat4.rotate(modelViewMatrix, modelViewMatrix, this.cubeRotation * 0.5, [1, 0, 0]) // 绕x轴旋转

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
        const numComponents = 2
        const type = gl.FLOAT
        const normalize = false
        const stride = 0
        const offset = 0
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord)
        gl.vertexAttribPointer(
          paramInfo.attribLocations.textureCoord,
          numComponents, type, normalize, stride, offset
        )
        gl.enableVertexAttribArray(paramInfo.attribLocations.textureCoord)
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
      gl.useProgram(paramInfo.program)
      gl.uniformMatrix4fv(paramInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
      gl.uniformMatrix4fv(paramInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)

      /** ****************** use texture - the start ****************** */
      gl.activeTexture(gl.TEXTURE0) // tell webgl we want to affect textrue unit 0 - active texture function
      gl.bindTexture(gl.TEXTURE_2D, texture) // bind the texture to texture unit 0 - bind texture
      gl.uniform1i(paramInfo.uniformLocations.uSampler, 0) // tell the shader we bound the texture to texture unit 0 - uniform texture
      /** ****************** use texture - the end ****************** */

      {
        const vertextCount = 36
        const type = gl.UNSIGNED_SHORT
        const offset = 0
        gl.drawElements(gl.TRIANGLES, vertextCount, type, offset)
      }
      this.cubeRotation += deltaTime
    },
    loadTexture (gl, png) {
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)

      const level = 0
      const internalFormat = gl.RGBA
      const width = 1
      const height = 1
      const border = 0
      const srcFormat = gl.RGBA
      const srcType = gl.UNSIGNED_BYTE
      const pixel = new Uint8Array([0, 0, 255, 255])
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel)

      const image = new Image()
      image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)
        if ((image.width & (image.width - 1)) === 0 && (image.width & (image.width - 1)) === 0) {
          gl.generateMipmap(gl.TEXTURE_2D)
        } else {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        }
      }
      image.src = png
      return texture
    },
    init3DBuffer (gl) {
      // 1. position buffer
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      const positions = [
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
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

      // 2. face buffer
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
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

      // 3. index buffer
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

      // 4. texture buffer
      const textureBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer)
      const textureCoordinates = [
        // Front
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Back
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Top
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Bottom
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Right
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Left
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW)

      // 5. cube vertex noraml buffer - 顶点法向量buffer
      const cubeVerticesNormalBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesNormalBuffer)
      var vertexNormals = [
        // Front
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        // Back
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        // Top
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        // Bottom
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,

        // Right
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        // Left
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0
      ]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW)

      return {
        position: positionBuffer,
        // color: colorBuffer,
        textureCoord: textureBuffer,
        indices: indexBuffer
      }
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
    initShaderProgram (gl, vsSource, fsSource) {
      let vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource)
      let fragShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
      let shaderProgram = gl.createProgram()
      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragShader)
      gl.linkProgram(shaderProgram)
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log('initialize shader program failed' + gl.getProgramInfoLog(shaderProgram))
        return null
      }
      return shaderProgram
    },
    initShader () {
      const vsSource = `
        attribute highp vec3 aVertexNormal;
        attribute highp vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform highp mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying highp vec2 vTextureCoord;

        void main(void) {
            gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
            vTextureCoord = aTextureCoord;
        }
      `
      const fsSource = `
        varying highp vec2 vTextureCoord;
        varying highp vec3 vLighting;

        uniform sampler2D uSampler;
        
        void main(void) {
            gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a)
        }
      `
      return {vsSource, fsSource}
    }
  }
}
</script>

<style scoped>
canvas{
  background-color: #c6eccb;
}
</style>
