import { View } from "react-native";
import ThemedText from "../themed-text";
import { useOrientation } from "../hooks/use-orientation";
import { useStore } from "../../utils/store";
import useSWR from "swr";
import { getLocations } from "../../utils/api";

export function LocationData() {
  const orientation = useOrientation();
  const { coordinates } = useStore();
  const key = `current-location/${JSON.stringify({ coordinates })}`;

  const { data, isLoading, error } = useSWR(
    key,
    async () => {
      if (!coordinates) return null;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await getLocations(
        coordinates.latitude,
        coordinates.longitude
      );
      return data;
    },
    {
      shouldRetryOnError: false,
    }
  );

  if (error) {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ThemedText color="danger">Failed to fetch location data</ThemedText>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (!coordinates)
    return (
      <View>
        <ThemedText>No coordinates found</ThemedText>
      </View>
    );

  return (
    <View
      style={{
        alignItems: "center",
        gap: 4,
      }}
    >
      <ThemedText color="info" fontSize={20}>
        {data?.city}
      </ThemedText>
      <View
        style={{
          alignItems: "center",
          flexDirection: orientation === "portrait" ? "row" : "column",
          gap: 4,
        }}
      >
        <ThemedText fontSize={18}>{data?.region}</ThemedText>
        {orientation === "portrait" && <ThemedText fontSize={18}>,</ThemedText>}
        <ThemedText fontSize={18}>{data?.country}</ThemedText>
      </View>
    </View>
  );
}
