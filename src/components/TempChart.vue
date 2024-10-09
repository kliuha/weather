<template>
  <div class="chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
)

const props = defineProps(['chartTime', 'chartTemp'])
const chartCanvas = ref(null)
let chartInstance = null

const initializeChart = () => {
  const ctx = chartCanvas.value.getContext('2d')

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.chartTime,
      datasets: [
        {
          label: 'Temperature throughout the day',
          data: props.chartTemp,
          fill: false,
          borderColor: '#ff6f00',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          min: Math.round(Math.min(...props.chartTemp) - 10),
          max: Math.round(Math.max(...props.chartTemp) + 10),
          ticks: {
            stepSize: props.chartTemp.length,
          },
          title: {
            display: true,
            text: 'Temperature (°C)',
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Temperature Variation Over a Day',
        },
        tooltip: {
          enabled: true,
        },
        legend: {
          display: true,
        },
      },
    },
  })
}

onMounted(() => {
  if (props.chartTime && props.chartTemp) {
    initializeChart()
  }
})

watch(
  () => [props.chartTime, props.chartTemp],
  ([newChartTime, newChartTemp]) => {
    if (newChartTime && newChartTemp) {
      initializeChart()
    }
  }
)
</script>

<style>
.chart {
  max-height: 350px;
  min-height: 200px;

  max-width: 705px;
  margin: 0 auto;
}
</style>
