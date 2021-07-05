<template>
  <div class="chart1-container">
    <ul class="charts">
      <li>
        <div ref="chartLeft" class="chart"></div>
        <div class="chart-title">工单完成率</div>
      </li>
      <li>
        <div ref="chartRight" class="chart"></div>
        <div class="chart-title">工单响应率</div>
      </li>
    </ul>
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
  name: 'chart1-box',
  data () {
    return {
      staticData: [
        {
          code: 'sumWork',
          value: 138,
          label: '总工单'
        },
        {
          code: 'delayWork',
          value: 10,
          label: '响应工单'
        },
        {
          code: 'newWork',
          value: 30,
          label: '完成工单'
        }
      ],
      chart: null
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
      const chartLeft = echarts.init(this.$refs.chartLeft)
      chartLeft.setOption(option)
      const chartRight = echarts.init(this.$refs.chartRight)
      chartRight.setOption(option)
      this.chart = {
        left: chartLeft,
        right: chartRight
      }
    },
    resizeChart () {
      this.chart.left.resize()
      this.chart.right.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart1-container {
  height: 100%;
  .charts {
    height: calc(100% - 3.2rem);
    padding: 0;
    overflow: hidden;
    margin-bottom: 0.8rem;
    li {
      width: 50%;
      height: 100%;
      float: left;
    }
    .chart {
      height: calc(100% - 1.5rem);
    }
    .chart-title {
      margin-top: 0.3rem;
      font-size: 0.8rem;
      font-weight: bold;
      color: #fff;
    }
  }
  .static {
    overflow: hidden;
    padding: 0;
    li {
      width: calc(100% / 3);
      float: left;
      color: white;
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
