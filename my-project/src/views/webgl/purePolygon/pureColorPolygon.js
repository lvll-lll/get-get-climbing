import {mat4} from 'gl-matrix'
/**
     * 顶点着色器：裁剪空间的坐标值
     * 片段着色器：裁剪空间的颜色值
     */
export function initWebGL () {
  let canvas = document.querySelector('#c') // 获取canvas画布
  // 初始化webgl上下文，获取WebGLRenderingContext
  let gl = canvas.getContext('webgl')
  // 确认WebGL支持性
  if (!gl) {
    alert('your device is not support webgl')
    return
  }
  gl.clearColor(0.5, 0.7, 0.5, 1.0) // 支持WebGL，使用完全不透明的黑色清除所有图像
  gl.clear(gl.COLOR_BUFFER_BIT) // 用上面指定的颜色清除缓冲区

  draw2DPolygon(gl)
}
// 绘制二维多边形
function draw2DPolygon (gl) {
  // 创建顶点着色器 Vertex shader program
  const vsSource = `
      attribute vec4 aVertexPosition;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      }
    `
  // 创建片段着色器 fragment shader program
  const fsSource = `
      void main() {
        gl_FragColor = vec4(1.0,1.0,1.0,1.0);
      }
    `
  // 初始化着色器程序
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
  const programInfo1 = programInfo(gl, shaderProgram, 'aVertexPosition', 'uProjectionMatrix', 'uModelViewMatrix')

  // 创建对象
  let buffers = initBuffer(gl)

  drawScene(gl, programInfo1, buffers)
}
// 初始化着色器程序，并且让WebGL知道如何绘制我们的数据
function initShaderProgram (gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  // 创建着色器程序 - 即定点着色器和片段着色器进行连接
  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  // 创建失败 alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('initialize the shader program faild:' + gl.getProgramInfoLog(shaderProgram))
    return null
  }

  // 创建成功，返回着色器程序
  return shaderProgram
}
// 创建指定类型的着色器，上传source源码并编译
function loadShader (gl, type, source) {
  /**
     * 创建和编译着色器的步骤
     */
  // 1. gl.createShader方法：创建新的着色器
  const shader = gl.createShader(type)
  // 2. gl.shaderSource:将源码发送到着色器
  gl.shaderSource(shader, source)
  // 3. 着色器获取到源码，调用gl.compileShader进行编译
  gl.compileShader(shader)
  // 4. 调用gl.getShaderParameter，判断编译是否成功
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('an error occurred compiling the shaders')
    gl.deleteShader(shader)
    return null
  }
  // 5. 着色器被加载并成功编译，返回着色器
  return shader
}
function programInfo (gl, shaderProgram, pos, pro, model) {
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, pos)
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, pro),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, model)
    }
  }
  return programInfo
}
// 创建对象
function initBuffer (gl) {
  // 1. 调用gl.createBuffer，得到缓冲区对象，并存储在顶点缓冲器
  const positionBuffer = gl.createBuffer()
  // 2. 调用bindBuffer，绑定上下文
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // 3. 定义数组，记录正方体的顶点
  let vertices = [
    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    1.0, -1.0, 0.0,
    -1.0, -1.0, 0.0
  ]

  // 4. 将定义的对象转换成浮点类型的数组，并通过bufferData方法传给gl对象，来建立对象的顶点
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  // 5. 返回顶点存储器
  return {
    position: positionBuffer
  }
}
// 绘制场景，开始渲染
function drawScene (gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0) // clear to black,fullyopaque
  gl.clearDepth(1.0) // 1.0 means clear everything
  gl.enable(gl.DEPTH_TEST) // enable depth testing
  gl.depthFunc(gl.LEQUAL) // near things obscure far things

  // 绘图之前，清理canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // 搭建相机透视矩阵
  const fieldOfView = 45 * Math.PI / 180 // 45度角
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const zNear = 1.0
  const zFar = 100.0
  const projectionMatrix = mat4.create()
  mat4.perspective(
    projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar
  )

  //
  const modelViewMatrix = mat4.create()
  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0])

  // Tell webgl how to pull out the position from the position
  // buffer into the vertexPosition attribute
  const numComponents = 3 // pull out 3 values per iteration
  const type = gl.FLOAT // the data in the buffer is 32bit floats
  const normalize = false // don't normalize
  const stride = 0 // how many bytes to get from on set of values to the next // 0 = use type and numComponents above
  const offset = 0 // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  )
  gl.enableVertexAttribArray(
    programInfo.attribLocations.vertexPosition
  )

  // Tell webgl to use our program when draw
  gl.useProgram(programInfo.program)

  // set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  )
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  )

  // 调用drawArrays画图像
  const offsetNew = 0
  const vertexCountNew = 4
  gl.drawArrays(gl.TRIANGLE_STRIP, offsetNew, vertexCountNew)
}
