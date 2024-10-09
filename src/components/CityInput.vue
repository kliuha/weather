<template>
  <div>
    <input
      :value="cityInput"
      placeholder="Enter the city"
      @input="(event) => handleCityInput(event.target.value)"
      class="city-input"
    />
    <ul v-if="citiesList.length" :ref="(el) => (citiesListEl = el)">
      <li v-for="city in citiesList" :key="city.lon + city.lat" @click="selectCity(city)">
        {{ city.fullName }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash'

import { useWeatherStore } from '@/store/store'

import { getCitiesData } from '@/api/openweatherApi'
import { getCitiesList } from '@/adapters/getCitiesList'

const weatherStore = useWeatherStore()
const props = defineProps(['city', 'index'])
const emit = defineEmits(['toggleCityLoading'])
const cityInput = ref(props.city?.fullName || '')
const citiesList = ref('')
const citiesListEl = ref(null)

const handleClickOutside = (event) => {
  if (!citiesList.value.length) return
  if (citiesListEl.value && !citiesListEl.value.contains(event.target)) {
    citiesList.value = []
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const selectCity = async (newCity) => {
  try {
    cityInput.value = `${newCity.fullName}`
    citiesList.value = []
    emit('toggleCityLoading', true)
    await weatherStore.setCity(newCity, props.index)
  } catch (err) {
    console.log(err)
  } finally {
    emit('toggleCityLoading', false)
  }
}

const handleCityInput = (cityData) => {
  cityInput.value = cityData
  fetchCities(cityData)
}

const fetchCities = debounce(async (cityData) => {
  if (!cityData) {
    citiesList.value = []
    return
  }

  try {
    const citiesResponse = await getCitiesData(cityData)
    citiesList.value = getCitiesList(citiesResponse)
  } catch (err) {
    console.log(err)
  }
}, 300)
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  position: absolute;
  background-color: #f7f5f5;
  max-height: 60vh;
  padding: 5px;
  overflow: auto;
  width: 280px;
}

li {
  cursor: pointer;
  padding: 5px;
}

li:hover {
  background-color: #f0f0f0;
}

.city-input {
  padding: 5px;
  min-width: 280px;
  max-width: 500px;
  border: 1px solid #421e03;
  height: 30px;
  box-sizing: border-box;
}
.city-input:focus {
  border-color: #ff6f00;
}
</style>
