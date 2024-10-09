import { defineStore } from "pinia";
import { ref, watch } from 'vue';

export const useWeatherStore = defineStore('weatherStore', () => {
  const cities = ref([{}]);
  const userCity = ref(null);

  const favoriteCities = ref([]);
  const favoriteCitiesInLocalStore = localStorage.getItem("favorite-cities");


  watch(() => favoriteCities, (state) => {
    localStorage.setItem("favorite-cities", JSON.stringify(state.value.map(city => {
      return {
        fullName: city.fullName,
        name: city.name,
        lat: city.lat,
        lon: city.lon,
        id: city.lat + city.lon,
        favorite: true,
        weather: null,
      }
    })))
  }, {deep: true});

  const addFavoriteCity = (newCity) => {
    favoriteCities.value.push(newCity);
    cities.value = cities.value.map(city => city.id === newCity.id ? { ...city, favorite: true } : city)
  };
  const deleteFavoriteCity = (id) => {
    favoriteCities.value = favoriteCities.value.filter(city => city.id !== id);
    cities.value = cities.value.map(city => city.id === id ? { ...city, favorite: false } : city)
  };

  const setCity = async (newCity, ind) => {
    cities.value[ind] = newCity;

    if (newCity.id) {
      await getWeatherData({ lon: newCity.lon, lat: newCity.lat }, ind)
    }
  };
  const addEmptyCity = () => {
    cities.value.push({});
  };
  const getCityByInd = (ind) => {
    return cities.value[ind];
  };
  const deleteCityByInd = (ind) => {
    cities.value.splice(ind, 1);
  };

  const getCityFromIP = async() => {
    try {
      const response = await fetch('http://www.geoplugin.net/json.gp');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      userCity.value = {
        lat: data.geoplugin_latitude,
        lon: data.geoplugin_longitude,
        fullName: `${data.geoplugin_city}, ${data.geoplugin_countryName}`,
        name: data.geoplugin_city,
        id: data.lat + data.lon,
      };
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getWeatherData = async(queryData, ind, isFavorit) => {
    try {
      const weather = await fetchWeatherData(queryData);
      if (!isFavorit) {
        cities.value[ind] = { ...cities.value[ind], weather }
      } else {
        favoriteCities.value[ind] = { ...favoriteCities.value[ind], weather }
      }
    } catch (error) {
      throw "Error while fetching weather";
    }
  }
  const fetchWeatherData = async(queryData) => {
    try {
      const { lat, lon } = queryData
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=metric`
      );
      return await data.json();
      
    } catch (error) {
      throw "Error while fetching weather";
    }
  }

  if (favoriteCitiesInLocalStore) {
    favoriteCities.value = JSON.parse(favoriteCitiesInLocalStore);
    favoriteCities.value.forEach((city, ind) => {
       getWeatherData({ lon: city.lon, lat: city.lat }, ind, true);
    });
  }

  return {
    cities,
    favoriteCities,
    setCity,
    getWeatherData,
    getCityByInd,
    addEmptyCity,
    deleteCityByInd,
    addFavoriteCity,
    deleteFavoriteCity,
    getCityFromIP,
    userCity,
    fetchWeatherData
  }
})