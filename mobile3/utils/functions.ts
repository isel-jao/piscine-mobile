export const getWeatherDescription = (weatherCode: number | undefined) => {
  if (weatherCode === undefined) return "Unknown";
  if (weatherCode === 0) return "Clear sky";
  if (weatherCode >= 1 && weatherCode <= 3) return "Mostly clear sky";
  if (weatherCode >= 45 && weatherCode <= 48) return "Fog";
  if (weatherCode >= 51 && weatherCode <= 55) return "drizzle";
  if (weatherCode >= 56 && weatherCode <= 57) return "Freezing drizzle";
  if (weatherCode >= 61 && weatherCode <= 65) return "Light rain";
  if (weatherCode >= 66 && weatherCode <= 67) return "Freezing rain";
  if (weatherCode >= 71 && weatherCode <= 75) return "Heavy rain";
  if (weatherCode >= 80 && weatherCode <= 85) return "Light snow";
  if (weatherCode >= 86 && weatherCode <= 87) return "Heavy snow";
  if (weatherCode >= 91 && weatherCode <= 95) return "Thunderstorm";
  if (weatherCode >= 96 && weatherCode <= 97) return "Light hail";
  if (weatherCode >= 98 && weatherCode <= 99) return "Heavy hail";
  return "Unknown";
  /// Weather codes are from https://open-meteo.com/
};

export const getWitherIconName = (weatherCode: number | undefined): any => {
  if (weatherCode === undefined) return "cloud-question";
  if (weatherCode === 0) return "weather-sunny";
  if (weatherCode >= 1 && weatherCode <= 3) return "weather-sunny";
  if (weatherCode >= 45 && weatherCode <= 48) return "weather-fog";
  if (weatherCode >= 51 && weatherCode <= 55) return "weather-partly-rainy";
  if (weatherCode >= 56 && weatherCode <= 57) return "weather-partly-snowy";
  if (weatherCode >= 61 && weatherCode <= 65) return "weather-pouring";
  if (weatherCode >= 66 && weatherCode <= 67) return "weather-snowy-rainy";
  if (weatherCode >= 71 && weatherCode <= 75) return "Heavy rain";
  if (weatherCode >= 80 && weatherCode <= 85) return "weather-snowy";
  if (weatherCode >= 86 && weatherCode <= 87) return "weather-snowy-heavy";
  if (weatherCode >= 91 && weatherCode <= 95) return "weather-lightning-rainy";
  if (weatherCode >= 96 && weatherCode <= 97) return "weather-hail";
  if (weatherCode >= 98 && weatherCode <= 99) return "weather-hail";
  return "cloud-question";
};
