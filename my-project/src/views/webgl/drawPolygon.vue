<template>
    <canvas id="c">webgl</canvas>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import {mat4} from 'gl-matrix'
export default {
  mounted () {
    this.initWebGL()
  },
  methods: {
    /**
     * 顶点着色器：裁剪空间的坐标值
     * 片段着色器：裁剪空间的颜色值
     */
    initWebGL () {
      let canvas = document.querySelector('#c') // 获取canvas画布
      // 初始化webgl上下文，获取WebGLRenderingContext
      let gl = canvas.getContext('webgl') 
      // 确认WebGL支持性
      if (!gl) {
        console.log('your device is not support webgl')
        return
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0) // 支持WebGL，使用完全不透明的黑色清除所有图像
      gl.clear(gl.COLOR_BUFFER_BIT) // 用上面指定的颜色清除缓冲区

      this.draw2DPolygon(gl)
    },
    // 绘制二维多边形
    draw2DPolygon(gl) {
      // 创建顶点着色器 Vertex shader program
      // const vsSrc = 'void main() {' +
      //       'gl_Position = vec4(0.0, 0.0, 0.0, 1.0);' + // 设置坐标
      //       'gl_PointSize = 200.0;' +                   // 设置尺寸
      //   '}'
      // // 创建片段着色器 fragment shader program
      // const fsSrc = 'void main() {' +
      //       'gl_FragColor = vec4(1.0, 0.0, 1.0, 0.75);' + // 设置颜色
      //   '}'

      const vsSrc = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main() {
          gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
          gl_PointSize = 200.0;
        }
      `;
      // 创建片段着色器 fragment shader program
      const fsSrc = `
        void main() {
          gl_FragColor = vec4(1.0,1.0,1.0,1.0);
        }
      `;

      // 初始化着色器程序
      const shaderProgram = this.initShaderProgram(gl, vsSrc, fsSrc)
      const programInfo = this.programInfo(gl,shaderProgram,'aVertexPosition', 'uProjectionMatrix','uModelViewMatrix')
      // 创建对象
      let buffers = this.initBuffer(gl)
      this.drawScene(gl, programInfo, buffers)

      // const vsSrc = "attribute vec4 a_Position;" +
      //   // "attribute vec4 a_Color;" +
      //   "varying vec4 v_Color;" +
      //   "void main(){" +
      //   "gl_Position = a_Position;" +
      //   // "v_Color = a_Color;" +
      //    "}";
      // var fsSrc =
      //   "precision mediump float;" +
      //   "varying vec4 v_Color;" +
      //    "void main() {" +
      //    "gl_FragColor = v_Color;" +
      //    "}";
      // 1.创建着色器对象
      // const vs = gl.createShader(gl.VERTEX_SHADER);
      // const fs = gl.createShader(gl.FRAGMENT_SHADER);
      // // 检查创建结果
      // if (vs === null) {
      //     console.log('gl.createShader(gl.VERTEX_SHADER) failed')
      // }
      // if (fs === null) {
      //      console.log('gl.createShader(gl.FRAGMENT_SHADER) failed')
      // }
      // // 2.填充源程序
      // gl.shaderSource(vs, vsSrc);
      // gl.shaderSource(fs, fsSrc);
      // // 3.编译
      // gl.compileShader(vs);
      // gl.compileShader(fs);
      // // 检查编译错误
      // if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      //     console.log('gl.compileShader(vs) failed')
      //     console.log(gl.getShaderInfoLog(vs));
      // }
      // if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      //     console.log('gl.compileShader(fs) failed');
      //     console.log(gl.getShaderInfoLog(fs));   // 输出错误信息
      // }
      // // 4.创建程序对象
      // var prog = gl.createProgram();
      // // 检查创建结果
      // if (prog === null) {
      //     console.log('gl.createProgram() failed');
      // }
      // // 5.为程序对象分配着色器
      // gl.attachShader(prog, vs);
      // gl.attachShader(prog, fs);
      // // 检查分配错误
      // if (gl.getProgramParameter(prog, gl.ATTACHED_SHADERS) !== 2) {
      //     console.log('gl.getProgramParameter(prog, gl.ATTACHED_SHADERS) failed');
      // }
      // // 6.连接程序对象
      // gl.linkProgram(prog);
      // // 检查连接错误
      // if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      //     console.log('gl.linkProgram(prog) failed');
      //     console.log(gl.getProgramInfoLog(prog));
      // }
      // // 7.使用程序对象
      // gl.useProgram(prog);
      // // 绘制矩形（一个点，但点的尺寸略大）
      // gl.drawArrays(gl.POINTS, 0, 1);
    },
    // 初始化着色器程序，并且让WebGL知道如何绘制我们的数据
    initShaderProgram(gl, vsSource, fsSource) {
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource)
      const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

      // 创建着色器程序 - 即定点着色器和片段着色器进行连接
      const shaderProgram = gl.createProgram()
      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragmentShader)
      gl.linkProgram(shaderProgram)

      // 创建失败 console.log
      if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log('initialize the shader program faild:' + gl.getProgramInfoLog(shaderProgram))
      }

      // 创建成功，返回着色器程序
      return shaderProgram
    },
    // 创建指定类型的着色器，上传source源码并编译
    loadShader(gl, type, source) {
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
      if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('an error occurred compiling the shaders')
        gl.deleteShader(shader)
        return null
      }
      // 5. 着色器被加载并成功编译，返回着色器
      return shader
    },
    programInfo(gl, shaderProgram, pos, pro, model) {
      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, pos)
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram ,pro),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, model)
        }
      }
      return programInfo
    },
    // 创建对象
    initBuffer(gl) {
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

      // 4. 将定义的对象转换成浮点类型的数组，并通过bufferData方法传给dl对象，来建立对象的顶点
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW)

      // 5. 返回顶点存储器
      return {
        position: positionBuffer
      }
    },
    // 绘制场景，开始渲染
    drawScene(gl, programInfo, buffers) {
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
      const numComponents  = 3 // pull out 3 values per iteration
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
      const offset_new = 0
      const vertexCount_new = 4
      gl.drawArrays(gl.TRIANGLE_STRIP, offset_new,vertexCount_new)
    }
  }
}
</script>

<style lang="scss" scoped>
canvas{
  border:2px solid black;
  background-color: black;
}
video{
  display: none;
}
</style>