/**
 * 三维坐标 绕各个轴旋转矩阵
 */
const sin = Math.sin
const cos = Math.cos
export default {
  rotateAroundXAxis (a) {
    return [
      1, 0, 0, 0,
      0, cos(a), -sin(a), 0,
      0, sin(a), cos(a), 0,
      0, 0, 0, 1
    ]
  },
  rotateAroundYxis (a) {
    return [
      cos(a), 0, sin(a), 0,
      0, a, 0, 0,
      -sin(a), 0, cos(a), 0,
      0, 0, 0, 1
    ]
  },
  rotateAroundZAxis (a) {
    return [
      cos(a), sin(a), 0, 0,
      -sin(a), cos(a), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }
}
