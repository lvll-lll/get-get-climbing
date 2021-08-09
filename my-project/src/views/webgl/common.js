import { mat4 } from 'gl-matrix'
export function initWebGL (id) {
  let canvas = document.querySelector(id)
  let gl = canvas.getContext('webgl')

  if (!gl) {
    console.log('your device is not support webgl')
    return null
  }
  return gl
}

// 清空canvas
export function clearCanvas (gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // clear to black
  gl.clearDepth(1.0) // clear everything
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

// 设置相机角度
export function setPerspective (gl) {
  const view = 45 * Math.PI / 186
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const zNear = 0.1
  const zFar = 100.0
  const project = mat4.create()

  mat4.perspective(project, view, aspect, zNear, zFar)
}

// 设置绘图中心点
export function setDrawCenterOfScene () {
  const modelView = mat4.create()
  mat4.translate(modelView, modelView, [-0.0, 0.0, -6.0])
}

// 设置webgl从顶点着色器的缓冲区中获取位置的方法
export function bufferVertexPosAttri (gl, programInfos, buffer) {
  const num = 2
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position)
  gl.vertexAttribPointer(
    programInfos.attribLocations.vertexPosition,
    num, type, normalize, stride, offset
  )
  gl.enableVertexAttribArray(programInfos.attribLocations.vertexPosition)
}

// 设置从片段着色器缓冲区中拉取颜色到顶点着色器色彩属性中的方法
export function pullOutColorFromFrag (gl, programInfos, buffer) {
  const num = 4
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.color)
  gl.vertexAttribPointer(
    programInfos.attribLocations.vertexColor,
    num, type, normalize, stride, offset
  )
  gl.enableVertexAttribArray(programInfos.attribLocations.vertexColor)
}

// 设置webgl使用着色器程序的方法
export function toUseProgram (gl, programInfo) {
  gl.useProgram(programInfo.program)
}

// 设置着色器属性其它属性
export function setShaderUniforms (gl, programInfo, projectionMatrix, modelViewMatrix) {
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix)

  {
    const offset = 0
    const vertexCount = 4
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }
  // squareRotation += deltaTime
}

export function drawScene (gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
  gl.clearDepth(1.0) // Clear everything
  gl.enable(gl.DEPTH_TEST) // Enable depth testing
  gl.depthFunc(gl.LEQUAL) // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

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

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset)
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition)
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset)
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexColor)
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program)

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix)
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix)

  {
    const offset = 0
    const vertexCount = 4
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
  }
}
