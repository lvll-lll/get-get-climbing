export function doForLetCode () {
  task15of7()
}
function task15of7 (arr) {
  let len = arr.length
  arr.sort((a, b) => a - b)
  arr[0] = 1
  for (let i = 1; i < len; i++) {
    arr[i] = Math.min(arr[i], arr[i - 1] + 1)
  }
  return arr[len - 1]
}
