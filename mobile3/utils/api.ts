import axios from "axios";

export const getLocations = async (latitude: number, longitude: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse`;

  const params = {
    format: "json",
    lat: latitude,
    lon: longitude,
    addressdetails: 1,
  };

  const response = await axios.get(url, {
    params,
    headers: {
      "accept-language": "en-US,en;q=0.9",
    },
  });
  if (response.status !== 200) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  const data = response.data;
  if (!data || data.error) {
    throw new Error("Nominatim API error: " + (data.error || "Unknown error"));
  }

  const address = data.address;
  const location = {
    country: address.country,
    region: address?.state || address?.region || address?.county,
    city: address?.city || address?.town || address?.village,
  };

  return location;
};

export const getCurrentWeather = async (
  latitude?: number,
  longitude?: number
) => {
  if (!latitude || !longitude) return null;
  const result = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: { latitude, longitude, current_weather: true },
  });
  return result?.data;
};

export const getTodayWeather = async (
  latitude?: number,
  longitude?: number
) => {
  const today = new Date().toISOString().split("T")[0];
  if (!latitude || !longitude) return null;
  const result = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude,
      longitude,
      hourly: "temperature_2m,weathercode,windspeed_10m",
      start: `${today}T00:00:00Z`,
      end: `${today}T23:59:59Z`,
    },
  });
  return result?.data;
};

export const getWeeklyWeather = async (
  latitude?: number,
  longitude?: number
) => {
  if (!latitude || !longitude) return null;
  const result = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude,
      longitude,
      daily: "temperature_2m_max,temperature_2m_min,weathercode",
    },
  });
  return result?.data;
};
