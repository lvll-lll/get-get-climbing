<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <ul>
      <li v-for="item in list"
          :key="item.value"
          @click="handleClick(item)">
        <a target="_blank">
          {{item.label}}
        </a>
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: [
        {
          label: 'baidu',
          value: 'baidu',
          href: 'http://www.baidu.com',
          router: '/webglFirst'
        },
        // eslint-disable-next-line standard/object-curly-even-spacing
        { label: 'transfer', value: 'transfer', router: '/transfer' }
      ]
    }
  },
  methods: {
    handleClick (item) {
      this.$router.push(item.router)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}
a {
  color: #42b983;
}
</style>
