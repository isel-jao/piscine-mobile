import { View } from "react-native";
import { useStore } from "../../../utils/store";
import useSWR from "swr";
import { getCurrentWeather } from "../../../utils/api";
import { useCallback } from "react";
import {
  getWeatherDescription,
  getWitherIconName,
} from "../../../utils/functions";
import { LocationData } from "../../location-data";
import { colors } from "../../../constants";
import ThemedText from "../../themed-text";
import { useOrientation } from "../../../hooks/use-orientation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function CurrentlyScreen() {
  const { location, coordinates } = useStore();
  const orientation = useOrientation();

  const { data, isLoading, error } = useSWR(
    `currently/${JSON.stringify({ coordinates, location })}`,
    async () => {
      if (!coordinates || !location) return null;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await getCurrentWeather(
        coordinates?.latitude,
        coordinates?.longitude
      );
      return result;
    }
  );

  const Comp = useCallback(() => {
    if (!coordinates || !location) return null;
    if (error) return <>{error.message}</>;
    if (isLoading) return <ThemedText>Loading...</ThemedText>;
    if (!data)
      return (
        <ThemedText
          style={{
            color: colors.danger,
          }}
        >
          No data found
        </ThemedText>
      );
    return (
      <View
        style={{
          alignItems: "center",
          padding: orientation === "portrait" ? 20 : 10,
          gap: orientation === "portrait" ? 20 : 10,
        }}
      >
        <ThemedText color="primary" fontSize={44}>
          {data?.current_weather?.temperature}°C
        </ThemedText>
        <View style={{ gap: 4, alignItems: "center" }}>
          <ThemedText>
            {getWeatherDescription(data?.current_weather?.weathercode)}
          </ThemedText>
          <MaterialCommunityIcons
            name={getWitherIconName(data?.current_weather?.weathercode)}
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
          <ThemedText>{data?.current_weather?.windspeed}km/h</ThemedText>
        </View>
      </View>
    );
  }, [data, isLoading, error, location, coordinates]);

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
      <LocationData />
      <Comp />
    </View>
  );
}
