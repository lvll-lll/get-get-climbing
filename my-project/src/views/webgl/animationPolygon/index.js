/**
 * 绘制旋转的正方形
 */
// import { mat4 } from 'gl-matrix'
import {
  initWebGL,
  //   clearCanvas,
  //   setPerspective,
  //   setDrawCenterOfScene,
  //   pullOutFormVertexPos,
  //   pullOutColorFromFrag,
  //   toUseProgram,
  //   setShaderUniforms,
  drawScene
} from '../common'

export function initAnimationPolygon (id) {
  let gl = initWebGL(id)

  const vsSource = initBothShader()['vsSource'] // vertex shader
  const fsSource = initBothShader()['fsSource'] // fragment shader

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource) // shader program
  const programInfos = programInfo(shaderProgram, 'aVertexPosition', 'aVertexColor', 'uPorjectionMatrix', 'uModelViewMatrix') // program info
  const buffer = initBuffer(gl) // buffer: position buffer and color buffer

  // add animation
  let then = 0
  function render (now) {
    now *= 0.001 // conver to seconds
    const deltaTime = now - then
    then = now

    drawScene(gl, programInfos, buffer, deltaTime) // draw

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

function initBothShader () {
  let vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uPorjectionMatrix;

        varying lowp vec4 vColor;

        void main() {
            gl_position = uModelViewMatrix * uPorjectionMatrix * aVertexPosition;
            vColor = aVertexColor
        }
    `
  let fsSource = `
        varying lowp vec4 vColor;
        void main() {
            gl_FragColor = vColor;
        }
    `
  return {
    vsSource, fsSource
  }
}

function initShaderProgram (gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const shaderProgram = gl.createProgram() // create
  gl.attachShader(shaderProgram, vertexShader) // attach
  gl.attachShader(shaderProgram, fragShader) // attach
  gl.linkProgram(shaderProgram) // link

  // return program
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('link shader program faild')
    return null
  }
  return shaderProgram
}

function loadShader (gl, type, source) {
  const shader = gl.createShader(type) // create
  gl.shaderSource(shader, source) // send source
  gl.compileShader(shader) // compile
  // return
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('An error occured compling the shader:' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function programInfo (gl, shaderProgram, vertPos, vetColor, pro, model) {
  const info = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, vertPos),
      vertexColor: gl.getAttribLocation(shaderProgram, vetColor)
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, pro),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, model)
    }
  }
  return info
}

function initBuffer (gl) {
  // position buffer
  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0
  ]
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  // color buffer
  const color = [
    1.0, 1.0, 1.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
  ]
  const colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW)

  // return
  return {
    position: positionBuffer,
    color: colorBuffer
  }
}
// function drawScene (gl, programInfos, buffer, deltaTime) {
//   clearCanvas(gl)
//   setPerspective(gl)
//   setDrawCenterOfScene()
//   pullOutFormVertexPos(gl, programInfos, buffer)
//   pullOutColorFromFrag(gl, programInfos, buffer)
//   toUseProgram(gl, programInfos)
//   setShaderUniforms(gl, programInfos)
// }
