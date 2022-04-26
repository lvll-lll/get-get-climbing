function makeInterator (arr) {
  let index = 0
  return {
    next: function () {
      return index < arr.length ? { value: arr[index] } : {done: true}
    }
  }
}
let testInterator = makeInterator(['a', 'b'])
testInterator.next()
testInterator.next()
// Interator实现链表
function ObjFn (value) {
  this.value = value
  this.next = null
}
ObjFn.prototype[Symbol.interator] = function () {
  let interator = { next: next }
  let current = this
  function next () {
    if (current) {
      let value = current.value
      current = current.next
      return { done: false, value: value }
    }
    return { done: true, value: undefined }
  }
  return interator
}
let one = new ObjFn(1)
let two = new ObjFn(2)
let three = new ObjFn(3)
one.next = two
two.next = three
for (let i of one) {
  console.log(i) // 1,2,3
}
// Interator与Generator
let myInterator = {
  [Symbol.interator]: function* () {
    yield 1
    yield 2
    yield 3
  }
}
console.log([...myInterator]) // [1,2,3]
for (let i of myInterator) {
  console.log(i) // 1 2 3
}
// 或者可以使用以下写法
let obj = {
  [Symbol.interator]: function* () {
    yield 'hello'
    yield 'world'
  }
}
for (let i of obj) {
  console.log(i) // hello // world
}
