export const getCitiesList = (citiesData) => {
  return citiesData.map(cityData => ({
    fullName: cityData.display_name,
    id: cityData.lat + cityData.lon,
    lat: cityData.lat,
    lon: cityData.lon,
    name: cityData.name,
    weather: null,
    favorite: false,
   }))
}
