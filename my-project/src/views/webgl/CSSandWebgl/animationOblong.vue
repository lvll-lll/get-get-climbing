<template>
  <div id="animation-oblong"></div>
</template>

<script>

export default {
  data () {
    return {
      currentAngle: 0.0,
      rotationRate: 6,
      previousTime: 0.0,
      degreesPerSecond: 90.0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const canvas = document.getElementById('animation-oblong')
      const gl = canvas.getContext('webgl')
      if (!gl) {
        alert('The device is not support webgl')
      }
      const vertexShader = `
        attribute vec2 aVertexPosition;
        uniform vec2 uScalingFactor;
        uniform vec2 uRotationVector;
        void main() {
          vec2 rotatedPosition = vec2(
            aVertexPosition.x * uRotationVector.y + aVertexPosition.y * uRotationVector.x,
            aVertexPosition.y * uRotationVector.y - aVertexPosition.x * uRotationVector.x
          );
          gl_position = vec4(rotatedPosition * uScalingFactor, 0.0, 1.0);
        }
      `
      const fragmentShader = `
        precision highp float;
        uniform vec4 uGlobalColor;
        void main() {
          gl_FragColor = uGlobalColor;
        }
      `
      const shaderSet = [
        {
          type: gl.VERTEX_SHADER,
          id: vertexShader
        }, {
          type: gl.FRAGMENT_SHADER,
          id: fragmentShader
        }
      ]
      const shaderProgram = this.buildShaderProgram(gl, shaderSet)
      const aspectRatio = gl.width / gl.height
      const currentRotation = [0, 1]
      const currentScale = [1.0, aspectRatio]
      const vertexArray = new Float32Array([
        -0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5, -0.5, -0.5, -0.5
      ])
      const vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW)
      const vertexNumComponents = 2
      const vertexCount = vertexArray.length / vertexNumComponents
      this.currentAngle = 0.0
      this.rotationRate = 6
      this.animateScene(gl, currentRotation, shaderProgram, currentScale, vertexBuffer, vertexNumComponents, vertexCount)
    },
    buildShaderProgram (gl, shaderInfo) {
      let program = gl.createProgram()
      shaderInfo.forEach(element => {
        let shader = this.compileShader(gl, element)
        if (shader) {
          gl.attachShader(program, shader)
        }
      })
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('Link Shader Program occur error')
        return
      }
      return program
    },
    compileShader (gl, type) {
      let code = document.getElementById('animation-oblong').firstChild.nodeValue
      let shader = gl.createShader(type)
      gl.shaderSource(shader, code)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('Compile Shader ERROR')
        return
      }
      return shader
    },
    animateScene (gl, currentRotation, shaderProgram, currentScale, vertexBuffer, vertexNumComponents, vertexCount) {
      gl.viewport(0, 0, gl.width, gl.height)
      gl.clearColor(0.8, 0.9, 1.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      let radians = this.currentAngle * Math.PI / 180.0
      currentRotation[0] = Math.sin(radians)
      currentRotation[1] = Math.cos(radians)
      gl.useProgram(shaderProgram)

      const uScalingFactor = gl.getUniformLocation(shaderProgram, 'uScalingFactor')
      const uGlobalColor = gl.getUniformLocation(shaderProgram, 'uGlobalColor')
      const uRotationVector = gl.getUniformLocation(shaderProgram, 'uRotationVector')
      gl.uniform2fv(uScalingFactor, currentScale)
      gl.uniform2fv(uRotationVector, currentRotation)
      gl.uniform2fv(uGlobalColor, [0.1, 0.7, 0.2, 1.0])
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      const aVertexPosition = gl.getAttributeLocation(shaderProgram, 'aVertexPosition')
      gl.enableVertexAttribArray(aVertexPosition)
      gl.vertexAttribPointer(aVertexPosition, vertexNumComponents,
        gl.FLOAT, false, 0, 0)

      gl.drawArrays(gl.TRIANGLES, 0, vertexCount)

      window.requestAnimationFrame(function (currentTime) {
        let deltaAngle = ((currentTime - this.previousTime) / 1000.0) *
          this.degreesPerSecond

        this.currentAngle = (this.currentAngle + deltaAngle) % 360

        this.previousTime = currentTime
        this.animateScene()
      })
    }
  }
}
</script>
