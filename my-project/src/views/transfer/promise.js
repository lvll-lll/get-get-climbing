/**
 * 手写promise
 */

// creatPromise () {
class MyPromise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = 'rejected'
    constructor (func) { // promise实例必须传入一个参数：函数
      this.PromiseState = MyPromise.PENDING // 存储promise的状态，默认pending
      this.PromiseResult = null
      this.onFulfilledCallbacks = [] // 保存成功回调
      this.onRejectedCallbacks = [] // 保存失败回调
      try {
        func(this.resolve.bind(this), this.reject.bind(this)) // 绑定this.注：此处需要进行this绑定的原因,因为这里把类方法this.reject和this.resolve作为构造函数里要执行的func函数的一个参数，并不会立即执行，只有当这个示例被创建后才会调用resolve()和reject()这两个方法，这时候的this指向已经变了，所以想要正确调用这个类的这两个方法，就必须是使用bind，将这里个方法的this指向绑定到新建的示例上去
      } catch (error) {
        this.reject(error) // 而此处的this.reject，是在构造函数里直接执行的，所以可以不用进行绑定，this指向是不变的，还指向这个构造函数
      }
    }
    resolve (result) {
      if (this.PromiseState === MyPromise.PENDING) {
        setTimeout(() => {
          this.PromiseState = MyPromise.FULFILLED
          this.PromiseResult = result
          this.onFulfilledCallbacks.forEach(callback => {
            callback(result)
          })
        })
      }
    }
    reject (reason) {
      if (this.PromiseState === MyPromise.PENDING) {
        setTimeout(() => {
          this.PromiseState = MyPromise.REJECTED
          this.promiseResult = reason
          this.onRejectedCallbacks.forEach(callback => {
            callback(reason)
          })
        })
      }
    }
    then (onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value // promise规定，如果onFulfilled是一个函数，就将原来的onFulfilled赋值给它，如果不是函数，则把value值返回
      onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw new Error(reason)
      } // 如果onRejected不是一个函数，则throw一个error

      const promise2 = new MyPromise((resolve, reject) => {
        if (this.PromiseState === MyPromise.PENDING) { // pending时，暂存回调
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = this.onFulfilled(this.promiseResult)
                resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = this.onRejected(this.promiseResult)
                resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            })
          })
        }
        if (this.PromiseState === MyPromise.FULFILLED) {
          setTimeout(() => { // 异步
            try {
              let x = onFulfilled(this.promiseResult)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        }
        if (this.PromiseState === MyPromise.REJECTED) {
          setTimeout(() => {
            try {
              let x = onRejected(this.promiseResult)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        }
      })
      return promise2
    }
} // 创建一个myPromise类
// return new MyPromise()
// console.log('1')
// let promise = new MyPromise((resolve, reject) => {
//   console.log('2')
//   setTimeout(() => {
//     console.log('A:', promise.PromiseState)
//     resolve('执行resolve输出')
//     console.log('B:', promise.PromiseState)
//     console.log('4')
//   })
// })
// promise.then(res => {
//   console.log('C:', promise.PromiseState)
//   console.log('fulfilled:', res)
// }, err => {
//   console.log('rejected:', err)
// })
// console.log('3')
/**
   * 总结：this绑定的区别
   * 1、call和apply绑定，会立即执行
   * 2、bind绑定不会立即执行，会先创建一个新的函数
   */
/**
 * @param {promise2} promise2 promise1.then返回的新的promise对象
 * @param {[type]} x promise1中onFulfilled或onRejected的返回值
 * @param {[type]} resolve promise2中的resolve方法
 * @param {[type]} reject promise2中的reject方法
 * resolve和reject的返回值有三种可能：普通值、promise对象、thenable对象/函数
 */
function resolvePromise (promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 2.3.2 如果 x 为 Promise ，则使 promise2 接受 x 的状态
  if (x instanceof MyPromise) {
    if (x.PromiseState === MyPromise.PENDING) {
      /**
       * 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
       * 注意"直至 x 被执行或拒绝"这句话，
       * 这句话的意思是：x 被执行x，如果执行的时候拿到一个y，还要继续解析y
       */
      x.then(y => {
        this.resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else if (x.PromiseState === MyPromise.FULFILLED) {
      // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
      resolve(x.promiseResult)
    } else if (x.PromiseState === MyPromise.REJECTED) {
      // 2.3.2.3 如果 x 处于拒绝态，用相同的据因拒绝 promise
      reject(x.promiseResult)
    }
  } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
    // 2.3.3 如果 x 为对象或函数
    try {
      // 2.3.3.1 把 x.then 赋值给 then
      var then = x.then
    } catch (e) {
      // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(e)
    }
    /**
     * 2.3.3.3
     * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
     * 传递两个回调函数作为参数，
     * 一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
     */
    if (typeof then === 'function') {
      // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
      let called = false // 避免多次调用
      try {
        then.call(x,
        // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            if (called) return
            called = true
            this.resolvePromise(promise2, y, resolve, reject)
          },
          // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return
            called = true
            reject(r)
          })
      } catch (e) {
        /**
         * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
         * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
         */
        if (called) return
        called = true
        /**
         * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
         */
        reject(e)
      }
    } else {
      // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
    return resolve(x)
  }
}

// 要使用 promises-aplus-tests 这个工具测试，必须实现一个静态方法deferred()
MyPromise.deferred = function () {
  let result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MyPromise
