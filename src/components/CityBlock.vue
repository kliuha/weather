<template>
  <div class="card">
    <div v-if="!isFavoriteCard && !isUserCityCard" class="city-block-data">
      <CityInput :city="city" :index="cityIndex" :toggleCityLoading="toggleCityLoading" />
      <button
        v-if="cityIndex > 0"
        @click="() => (deletionConfirmation = true)"
        class="basic-button"
      >
        Delete city block
      </button>
    </div>
    <BasicLoader v-if="isCityLoading" class="loader" />
    <template v-else>
      <div class="city-data">
        <p class="city-title">
          <span v-if="isUserCityCard">Your location: </span>
          <span>{{ props.cityData?.fullName || '' }}</span>
        </p>
        <button
          v-if="canAddToFavorite && !isUserCityCard"
          @click="handleAddingFavoriteCity"
        >
          <img class="star" :src="require('@/assets/imgs/stroke_star.svg')" />
        </button>
        <button
          v-if="
            isFavoriteCard || (props.cityData.id && !canAddToFavorite && !isUserCityCard)
          "
          @click="handleDeletingFavoriteCity"
        >
          <img class="star" :src="require('@/assets/imgs/fill_star.svg')" />
        </button>
      </div>
      <button
        v-if="props.cityData.id"
        :disabled="forecastType === 'hourly'"
        class="toggle-btn basic-button"
        @click="() => (forecastType = 'hourly')"
      >
        Today
      </button>
      <button
        v-if="props.cityData.id"
        :disabled="forecastType === 'daily'"
        class="basic-button toggle-btn toggle-btn_right"
        @click="() => (forecastType = 'daily')"
      >
        5 days
      </button>
      <BasicLoader v-if="cityData?.id && !cityData?.weather" class="loader" />
      <WeatherInfoBlock
        v-if="cityData?.weather"
        :forecastType="forecastType"
        :weatherDataList="cityData?.weather?.list"
      />
      <ModalWindow :show="deletionConfirmation">
        <p>Are you sure you want to delete this weather block?</p>
        <button @click="() => (deletionConfirmation = false)" class="basic-button">
          Cancel
        </button>
        <button @click="deleteNewCityBlock" class="basic-button basic-button-right">
          Ok
        </button>
      </ModalWindow>
      <ModalWindow :show="cantAddToFavorite">
        <p>
          To add a city, delete some city from your favorites, because there are a maximum
          of 5 favorite cities
        </p>
        <button @click="() => (cantAddToFavorite = false)" class="basic-button">
          Ok
        </button>
      </ModalWindow>
    </template>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useWeatherStore } from '@/store/store'
import CityInput from '@/components/CityInput.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import WeatherInfoBlock from '@/components/WeatherInfoBlock.vue'
import BasicLoader from '@/components/BasicLoader.vue'

const weatherStore = useWeatherStore()
const props = defineProps(['cityData', 'cityIndex', 'isFavoriteCard', 'isUserCityCard'])
const city = ref(props.cityData)
const deletionConfirmation = ref(false)
const cantAddToFavorite = ref(false)
const isCityLoading = ref(false)
const forecastType = ref('hourly')

const toggleCityLoading = (iaLoading) => {
  isCityLoading.value = iaLoading
}

const canAddToFavorite = computed(() => {
  return (
    props.cityData.id &&
    !weatherStore.favoriteCities.some((city) => city.id === props.cityData.id)
  )
})

const deleteNewCityBlock = () => {
  deletionConfirmation.value = false
  if (weatherStore.cities.length < 2) return
  weatherStore.deleteCityByInd(props.cityIndex)
}
const handleAddingFavoriteCity = () => {
  if (weatherStore.favoriteCities.length >= 5) {
    cantAddToFavorite.value = true
    return
  }
  weatherStore.addFavoriteCity(props.cityData)
}
const handleDeletingFavoriteCity = () => {
  weatherStore.deleteFavoriteCity(props.cityData.id)
}
</script>
<style scoped>
.city-title {
  font-weight: bold;
  color: #421e03;
  font-size: 1.2rem;
}

.city-data {
  display: flex;
  justify-content: space-between;
}

.city-block-data {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 500px) {
  .city-block-data {
    flex-wrap: wrap-reverse;
    gap: 5px;
  }
}

.star {
  cursor: pointer;
}
.toggle-btn-wrapper {
  width: fit-content;
  border: 2px solid #741507;
}
</style>
