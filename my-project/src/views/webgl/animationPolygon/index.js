/**
 * 绘制旋转的正方形
 */
import { mat4 } from 'gl-matrix'
import {
  initWebGL,
  clearCanvas,
  bufferVertexPosAttri,
  pullOutColorFromFrag,
  setShaderUniforms
} from '../common'
var squareRotation = 0

export function initAnimationPolygon (id) {
  let gl = initWebGL(id)

  let vsSource = initBothShader()['vsSource'] // vertex shader
  let fsSource = initBothShader()['fsSource'] // fragment shader

  let shaderProgram = initShaderProgram(gl, vsSource, fsSource) // shader program
  let programInfos = programInfo(gl, shaderProgram, 'aVertexPosition', 'aVertexColor', 'uProjectionMatrix', 'uModelViewMatrix') // program info

  let buffer = initBuffer(gl) // buffer: position buffer and color buffer

  // add animation
  let then = 0
  function render (now) {
    now *= 0.001 // conver to seconds
    let deltaTime = now - then
    then = now

    drawScene(gl, programInfos, buffer) // draw

    // Update the rotation for the next draw
    squareRotation += deltaTime

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

function initBothShader () {
  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `

  // Fragment shader program
  const fsSource = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `
  return {
    vsSource, fsSource
  }
}

function initShaderProgram (gl, vsSource, fsSource) {
  let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)

  let fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  let shaderProgram = gl.createProgram() // create
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
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('An error occured compling the shader:' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function programInfo (gl, shaderProgram, vertPos, vetColor, pro, model) {
  return {
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
}

function initBuffer (gl) {
  // position buffer
  let positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0
  ]
  let positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  // color buffer
  let color = [
    1.0, 1.0, 1.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
  ]
  let colorBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW)

  // return
  return {
    position: positionBuffer,
    color: colorBuffer
  }
}
export function drawScene (gl, programInfos, buffer) {
  clearCanvas(gl)

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180 // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const zNear = 0.1
  const zFar = 100.0
  const projectionMatrix = mat4.create()

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar)

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create()

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  mat4.translate(modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]) // amount to translate
  mat4.rotate(modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    squareRotation, // amount to rotate in radians
    [0, 0, 1]) // axis to rotate around

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  bufferVertexPosAttri(gl, programInfos, buffer)

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  pullOutColorFromFrag(gl, programInfos, buffer)

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfos.program)

  // Set the shader uniforms
  setShaderUniforms(gl, programInfos, projectionMatrix, modelViewMatrix)

  // Update the rotation for the next draw
  // squareRotation += deltaTime
}
