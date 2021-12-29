<template>
  <div class="promise-contain">
    <el-button @click="handlePromiseCoreTips">promise核心要点</el-button>
    <li v-show="showTips1" v-for="(item,i) in promiseResult" :key="i + '1i1'">{{item}}</li>
    <el-button @click="handlePromise">promise执行点</el-button>
    <li v-show="showTips2" v-for="(item,i) in promiseHandle" :key="i + '1i2'">{{item}}</li>
  </div>
</template>

<script>
/**
 * 手写promise的几个知识点：Promise,Class类,改变this指向(call、apply和bind),时间循环EvnetLoop,等
 */
export default {
  data () {
    return {
      promiseResult: [
        '1. 执行reslove(), Promise的状态就会变成fulfilled，即完成',
        '2. 执行reject(), 状态变成rejected，即拒绝',
        '3. Promise只以第一次执行结果为准，第一次成功就永久fulfilled，第一次失败就永远rejected',
        '4. Promise中有throw,就相当于执行了reject'
      ],
      promiseHandle: [
        '1. promise的初始状态是pending',
        '2. promise里如果没有执行resolve()、reject()或者throw，这个promise的状态会一直是pending',
        '3. 基于第2条，在这个状态下的promise是不会执行回调函数then的',
        '4. 规定必须给promise对象传入一个执行函数，否则会报错'
      ],
      promiseError: [
        '1. catch()方法，返回的是一个promise，它的行为等同于Promise.prototype.then(undefined, onRejected),' +
            'Promise.prototype.catch()方法是.then(null,rejection)或者.then(undefined,rejection)的别名，用于指定发生错误时的回调函数',
        '2. '
      ],
      showTips1: false,
      showTips2: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {},
    creatPromise () {
      class myPromise {
        static PENDING = 'pending'
        static FULFILLED = 'fulfilled'
        static REJECTED = 'rejected'
        constructor (func) { // promise实例必须传入一个参数：函数
          this.PromiseState = myPromise.PENDING // 存储promise的状态，默认pending
          this.PromiseResult = null
          try {
            func(this.resolve.bind(this), this.reject.bind(this)) // 绑定this.注：此处需要进行this绑定的原因,因为这里把类方法this.reject和this.resolve作为构造函数里要执行的func函数的一个参数，并不会立即执行，只有当这个示例被创建后才会调用resolve()和reject()这两个方法，这时候的this指向已经变了，所以想要正确调用这个类的这两个方法，就必须是使用bind，将这里个方法的this指向绑定到新建的示例上去
          } catch (error) {
            this.reject(error) // 而此处的this.reject，是在构造函数里直接执行的，所以可以不用进行绑定，this指向是不变的，还指向这个构造函数
          }
        }
        resolve (result) {
          if (this.PromiseState === myPromise.PENDING) {
            this.PromiseState = myPromise.FULFILLED
            this.PromiseResult = result
          }
        }
        reject (reason) {
          if (this.PromiseState === myPromise.PENDING) {
            this.PromiseState = myPromise.REJECTED
            this.promiseResult = reason
          }
        }
        then (onFulfilled, onRejected) {
          onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value // promise规定，如果onFulfilled是一个函数，就将原来的onFulfilled赋值给它，如果不是函数，则把value值返回
          onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw new Error(reason)
          } // 如果onRejected不是一个函数，则throw一个error
          if (this.PromiseState === myPromise.FULFILLED) {
            setTimeout(() => { // 异步
              onFulfilled(this.PromiseResult)
            })
          }
          if (this.PromiseState === myPromise.REJECTED) {
            setTimeout(() => {
              onRejected(this.promiseResult)
            })
          }
        }
      } // 创建一个myPromise类
      let promise = new myPromise()
      console.log(promise)
      /**
       * 总结：this绑定的区别
       * 1、call和apply绑定，会立即执行
       * 2、bind绑定不会立即执行，会先创建一个新的函数
       */
    },
    handlePromiseCoreTips () {
      const p1 = new Promise((resolve, reject) => {
        resolve('成功')
        reject(new Error('失败'))
      })
      console.log('p1:', p1)
      const p2 = new Promise((resolve, reject) => {
        reject(new Error('失败'))
        resolve('成功')
      })
      console.log('p2:', p2)
      const p3 = new Promise((resolve, reject) => {
        throw new Error('报错')
      })
      console.log('p3:', p3)
      this.showTips1 = true
    },
    handlePromise () {
      let promise1 = new Promise(() => {})
      console.log('promise1:', promise1)
      let promise2 = new Promise((resolve, reject) => {
        // var a = 1
        for (let i = 0; i < 5; i++) {
          console.log('i:', i)
          // a++
        }
      })
      console.log('promise2:', promise2)
      promise2.then(res => {
        console.log('promise2执行了then', res)
      })
      this.showTips2 = true
      let promise0 = new Promise()
      console.log('promise0:', promise0)
    }
  }
}
</script>

<style lang="scss" scoped>
.promise-contain{
  padding: 20px;
  text-align: left;
}
</style>
