export function doForLetCode () {
  letCode15of7() // LetCode 15/07
  applyAndCall() // apply and call
}
function letCode15of7 (arr) {
  let len = arr.length
  arr.sort((a, b) => a - b)
  arr[0] = 1
  for (let i = 1; i < len; i++) {
    arr[i] = Math.min(arr[i], arr[i - 1] + 1)
  }
  return arr[len - 1]
}
function applyAndCall () {
  let a = {
    user: 'The one',
    // fn: function (e, ee) {
    //   console.log(this.user)
    //   console.log(e + ee)
    // }
    fn: (e, ee) => {
      console.log(this.user)
      console.log(e + ee)
    }
  }
  let b = a.fn
  b() // undefined NaN
  b.call(a, 1, 2) // b指向a,The one/3
  b.apply(a, [1, 3]) // b指向a,The one/4
}
