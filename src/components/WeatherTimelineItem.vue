<template>
  <div>
    <img :src="weatherImgAddress" :alt="props.weatherData.weatherDescription" />
    <p class="time">
      {{ props.weatherData.time }}
    </p>
    <div class="weather-element">
      <p class="weather-parameter">t°</p>
      <p>{{ Math.round(props.weatherData.temp) + '°С' }}</p>
    </div>
    <div class="weather-element">
      <img class="wind-img weather-parameter" :src="require('@/assets/imgs/wind.svg')" />
      {{ (Math.round(props.weatherData.wind * 10) / 10).toFixed(1) + 'km/h' }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['weatherData'])

const weatherImgAddress = computed(() => {
  return require(`@/assets/imgs/${props.weatherData.weatherDescription}.svg`)
})
</script>

<style scoped>
.time {
  font-weight: bold;
  color: #421e03;
  font-size: 1.2rem;
}
.weather-element {
  display: flex;
  margin: 0 auto 20px;
}

.weather-parameter {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
