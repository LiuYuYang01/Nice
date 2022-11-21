<template>
  <div ref="user" style="height:260px" />
</template>

<script>
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([GridComponent, BarChart, CanvasRenderer])
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.user)
    const option = {
      color: ['#727cf5'],
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          show: false // 不显示坐标轴刻度线
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#999'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#e0e2ff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false // 不显示坐标轴上的文字
        },
        splitLine: {
          lineStyle: {
            color: '#f9f9f9' // 分割线颜色
          }
        }
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: '50%', // 设置柱状图宽度
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }

    option && myChart.setOption(option)

    // ECharts 图表适配
    this.$erd.listenTo(this.$refs.user, () => {
      this.$nextTick(() => {
        myChart.resize()
      })
    })

    // window.addEventListener('resize', function() {
    //   myChart.resize()
    // })
  }
}
</script>

<style>
</style>
