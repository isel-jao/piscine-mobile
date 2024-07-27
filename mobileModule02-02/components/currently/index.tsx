import { View } from "react-native";
import { useOrientation } from "../hooks/use-orientation";
import ThemedText from "../themed-text";
import { LocationData } from "../location-data";
import useSWR from "swr";
import { useGlobalStore } from "../../utils/store";
import { getCurrentWeather, getLocations } from "../../utils/api";
import {
  getWeatherDescription,
  getWitherIconName,
} from "../../utils/functions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../utils/constants";
import Loading from "../loading";

export function CurrentlyScreen() {
  const orientation = useOrientation();
  const { coordinates, error, setError } = useGlobalStore();

  const { data, isLoading } = useSWR(
    `currently/${JSON.stringify({ coordinates, error })}`,
    async () => {
      if (!coordinates || error) return null;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const currentWeatherData = await getCurrentWeather(
        coordinates?.latitude,
        coordinates?.longitude
      );
      const locationData = await getLocations(
        coordinates.latitude,
        coordinates.longitude
      );

      return {
        currentWeatherData,
        locationData,
      };
    },
    {
      onError: () => {
        setError("An error occurred while fetching Current Weather data");
      },
    }
  );

  if (error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{
            color: colors.danger,
          }}
        >
          {error}
        </ThemedText>
      </View>
    );
  if (isLoading) return <Loading />;
  if (!data)
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          flexDirection: orientation === "landscape" ? "row" : "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <ThemedText>Search for a location to get the weather data</ThemedText>
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: orientation === "portrait" ? "column" : "row",
      }}
    >
      <LocationData data={data.locationData} />
      <View
        style={{
          alignItems: "center",
          padding: orientation === "portrait" ? 20 : 10,
          gap: orientation === "portrait" ? 20 : 10,
        }}
      >
        <ThemedText color="primary" fontSize={44}>
          {data.currentWeatherData?.current_weather?.temperature}°C
        </ThemedText>
        <View style={{ gap: 4, alignItems: "center" }}>
          <ThemedText>
            {getWeatherDescription(
              data.currentWeatherData?.current_weather?.weathercode
            )}
          </ThemedText>
          <MaterialCommunityIcons
            name={getWitherIconName(
              data.currentWeatherData?.current_weather?.weathercode
            )}
            size={64}
            color={colors.info}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name={"weather-windy"}
            size={24}
            color={colors.info}
          />
          <ThemedText>
            {data.currentWeatherData?.current_weather?.windspeed}km/h
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
