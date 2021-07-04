<template>
  <div class="chart1-container">
    <div class="chart" ref="chart"></div>
    <ul class="static">
      <li v-for="item of staticData" :key="item.code">
        <div class="num">{{ item.value }}</div>
        <div class="label">{{ item.label }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'chart5-box',
  data () {
    return {
      chart: null,
      staticData: [
        {
          code: 'livePerson',
          value: 10,
          label: '在线人数'
        },
        {
          code: 'sumPerson',
          value: 138,
          label: '总人数'
        }
      ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const option = {
        tooltip: {
          trigger: 'item',
          show: false
        },
        legend: {
          top: '5%',
          left: 'center',
          show: false
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '85%'],
            avoidLabelOverlap: false,
            emphasis: {
              scale: false
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 1048,
                name: '搜索引擎',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#0000ff'},
                      {offset: 1, color: '#ffffff'}
                    ]
                  )
                }
              },
              {
                value: 735,
                name: '直接访问',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#ffffff'},
                      {offset: 1, color: '#ff0000'}
                    ]
                  )
                }
              }
            ]
          }
        ]
      }
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(option)
    },
    resizeChart () {
      this.chart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart1-container {
  height: 100%;
  .chart {
    float: left;
    width: calc(100% - 6rem);
    height: 100%;
  }
  .static {
    overflow: hidden;
    padding: 0;
    float: left;
    width: 4rem;
    line-height: 1.6rem;
    li {
      color: white;
      &:first-child {
        margin-bottom: 1rem;
        margin-top: 0.3rem;
      }
      .num {
        font-weight: bold;
        font-size: 1.2rem;
      }
      .label {
        color: #fff;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
