<template>
  <div>
    <p>使用矩阵操作DOM，一个非常简单的开始使用矩阵的方法：是使用CSS3里面的matrix3d变换
      下面来做演示
    </p>
    <el-button type="primary" @click="moveDom">移动元素</el-button>
    <el-button type="primary" @click="scaleDom">缩放元素</el-button>
    <div id="move-me" class="transformable">
      <h2>Move me with a matrix</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      moveTo: false
    }
  },
  mounted () {
  },
  methods: {
    moveDom () {
      this.moveTo = !this.moveTo
      this.changeDomLocal()
    },
    // 从矩阵数组创建matrix3d样式属性
    matrixArrayToCssMatrix (array) {
      return 'matrix3d(' + array.join(',') + ')'
    },
    changeDomLocal () {
      let x, y
      let z = 0
      if (this.moveTo) {
        x = -50
        y = -100
      } else {
        x = 50
        y = 100
      }
      const translationMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
      ]
      let moveMe = document.getElementById('move-me')
      let matrix3dRule = this.matrixArrayToCssMatrix(translationMatrix)
      console.log('matrix3dRule:', matrix3dRule)
      moveMe.style.transform = matrix3dRule
    },
    scaleDom () {
      var w = 1.5 // width  (x)
      var h = 0.7 // height (y)
      var d = 1 // depth  (z)
      var scaleMatrix = [
        w, 0, 0, 0,
        0, h, 0, 0,
        0, 0, d, 0,
        0, 0, 0, 1
      ]
      console.log(scaleMatrix)
    }
  }
}
</script>

<style scoped>
.transformable {
  width:200px;
  height:200px;
  overflow-y:scroll;
  background:#4cc;
  padding:10px;
  border:2px solid #333;
  position:absolute;
  top:50%;
  left:50%;
  margin-left:-100px;
  margin-top:-100px;
  transition: transform 500ms;
}
.transformable h2 {
  margin-top:0;
}
.ghost {
  opacity: 0.1;
  pointer-events:none;
}
.lesson-title {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0.7em;
  font-family: sans-serif;
  font-size: 1em;
  color: #888;
  font-weight: normal;
}
</style>
