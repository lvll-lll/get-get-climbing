<template>
  <div class="transfer-main">
    <ElTransfer v-model="value" :data="data" filterable>
      <div slot="left-top-filter">
        <el-select v-model="select" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div slot="right-top-filter">
        <el-input placeholder="请输入"></el-input>
      </div>
    </ElTransfer>
    <div style="height:20px"></div>
    <ElTransfer v-model="value" :data="data" filterable
      :props="{
        key:'value',
        label:'label'
      }"
      :render-content="renderFunc"
      :manualChange="true"
      @changeData="changeData"
      >
      <div slot="left-top-filter">
        <el-select v-model="selectLeft" placeholder="请选择">
          <el-option
            v-for="item in optionsLeft"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div slot="right-top-filter">
        <el-select v-model="selectRight" placeholder="请选择">
          <el-option
            v-for="item in optionsRight"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div slot="right-top-filter">
        <el-input placeholder="请输入"></el-input>
      </div>
    </ElTransfer>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import ElTransfer from './src/main.vue'
import {dataObjItems} from './const'
export default {
  components: {  ElTransfer },
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1, 4],
      options: dataObjItems,
      data: dataObjItems,
      select: '',
      selectLeft: '',
      renderFunc(h, option) {
        // return <span>{ option.value } - { option.label }（{option.type}）</span>;
        return <span>{ option.label }（{option.type}）</span>;
      },
      optionsLeft: [],
      optionsRight: [],
      dataTemp:[],
      selectRight: ''
    }
  },
  watch: {
    selectLeft(val) {
      console.log(val)
      this.data = this.dataTemp.filter(item => item.type === val)
    },
    selectRight(val) {
      this.optionsRight = this.transferData['target'].filter(item => item.type === val)
    }
  },
  mounted() {
    this.initLeftSelect()
  },
  methods:{
    changeData(val) {
      console.log('0----------------',val)
      this.transferData = val
      let tempTarget = []
      let tempSource = []
      val['target'].map(item => {
        if(!tempTarget.includes(item.type)) {
          this.optionsLeft.push({
            label: item.type,
            value: item.type
          })
          tempTarget.push(item.type)
        }
      })
      val['source'].map(item => {
        if(!tempSource.includes(item.type)) {
          this.optionsLeft.push({
            label: item.type,
            value: item.type
          })
          tempSource.push(item.type)
        }
      })
    },
    initLeftSelect() {
      this.dataTemp = this.data
      let temp = []
      this.data.map(item => {
        if(!temp.includes(item.type)) {
          this.optionsLeft.push({
            label: item.type,
            value: item.type
          })
          temp.push(item.type)
        }
      })
    }
  }
}
</script>

<style scoped>
.transfer-main{
  padding: 20px 0;
}
</style>