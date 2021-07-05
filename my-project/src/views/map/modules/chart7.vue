<template>
  <div class="chart1-container" ref="chart">
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'chart7-box',
  data () {
    return {
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
          trigger: 'axis',
          axisPointer: { // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          },
          show: false
        },
        legend: {
          data: ['Direct', 'Mail Ad', 'Affiliate Ad'],
          show: false
        },
        grid: {
          left: '5',
          right: '10',
          bottom: '5',
          top: '10',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed'],
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: 14,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            barWidth: 14,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            barWidth: 14,
            label: {
              show: false
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191]
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
  width: 100%;
}
</style>
