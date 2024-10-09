export async function getCitiesData(query) {
  try {
    const data = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${query}&format=json&limit=10&lang=en`
    );

    return data.json();
  } catch (error) {
    throw "Error while fetching weather";
  }
}