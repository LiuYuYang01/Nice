<template>
  <div ref="visits" style="height:260px" />
</template>

<script>
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TooltipComponent
])
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.visits)
    const option = {
      color: ['#727cf5'],
      xAxis: {
        type: 'category',
        boundaryGap: false, // 两边不留白
        data: ['前天', '昨天', '今天'],
        axisTick: {
          show: true, // 不显示坐标轴刻度线
          alignWithLabel: false,
          tickStyle: {
            color: '#999'
          }
        },
        // 分割线颜色
        axisLine: {
          show: false,
          lineStyle: {
            color: '#e0e2ff'
          }
        },
        // 文本颜色
        axisLabel: {
          color: '#999' // 文字颜色
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#f9f9f9' // 分割线颜色
          }
        },
        axisLabel: {
          show: false // 不显示坐标轴上的文字
        },
        axisTick: {
          show: false // 不显示坐标轴刻度线
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          data: [23, 63, 55],
          type: 'line',
          smooth: true,
          areaStyle: { // 区域填充渐变颜色
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(121, 122, 243, 1)' // 100% 处的颜色
              }, {
                offset: 1, color: 'rgba(255, 255, 255, 0.5)' // 0% 处的颜色
              }],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }

    option && myChart.setOption(option)

    // ECharts 图表适配
    this.$erd.listenTo(this.$refs.visits, () => {
      this.$nextTick(() => {
        myChart.resize()
      })
    })
  }
}
</script>

<style>
</style>
