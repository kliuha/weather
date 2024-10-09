<template>
  <div class="nav-container container">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/favorites">Favorites</router-link></li>
      </ul>
    </nav>
    <button v-if="isHomePage" @click="addNewCityBlock" class="basic-button">
      Add new city
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from '@/store/store'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHomePage = computed(() => route.path === '/')
const weatherStore = useWeatherStore()

const addNewCityBlock = () => {
  if (weatherStore.cities.length >= 5) return
  weatherStore.addEmptyCity()
}
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

nav ul {
  display: flex;
  padding: 0;
  gap: 20px;
  list-style: none;
}

nav a {
  text-decoration: none;
  color: #000;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #ff6f00;
}
</style>
