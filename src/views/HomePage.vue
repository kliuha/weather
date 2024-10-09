<template>
  <div class="container">
    <CityBlock
      v-if="weatherStore?.userCity?.weather"
      :city-data="weatherStore.userCity"
      :city-index="0"
      :is-user-city-card="true"
    />
    <CityBlock
      v-for="(city, ind) in weatherStore.cities"
      :city-data="city"
      :key="ind"
      :city-index="ind"
    />
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useWeatherStore } from '@/store/store'

import CityBlock from '@/components/CityBlock.vue'

const weatherStore = useWeatherStore()

onBeforeMount(async () => {
  await weatherStore.getCityFromIP()
  const userWeather = await weatherStore.fetchWeatherData({
    lat: weatherStore.userCity.lat,
    lon: weatherStore.userCity.lon,
  })
  weatherStore.userCity = { ...weatherStore.userCity, weather: userWeather }
})
</script>

<style></style>
