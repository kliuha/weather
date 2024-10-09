<template>
  <div class="container">
    <div v-if="!weatherStore.favoriteCities.length" class="card">
      The weather for your selected cities will be displayed here.
    </div>
    <CityBlock
      v-for="(city, ind) in weatherStore.favoriteCities"
      :city-data="city"
      :key="ind"
      :city-index="ind"
      :is-favorite-card="true"
    />
  </div>
</template>

<script setup>
import { useWeatherStore } from '@/store/store'

import CityBlock from '@/components/CityBlock.vue'

const weatherStore = useWeatherStore()
</script>

<style></style>
