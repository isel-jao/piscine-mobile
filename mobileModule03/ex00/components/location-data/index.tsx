import { View } from "react-native";
import useSWR from "swr";
import { useStore } from "../../utils/store";
import { getLocations } from "../../utils/api";
import { colors } from "../../constants";
import { useEffect } from "react";
import ThemedText from "../themed-text";
import { useOrientation } from "../../hooks/use-orientation";

export function LocationData() {
  const {
    location,
    setLocation,
    coordinates,
    setError,
    error: geoError,
  } = useStore();
  const orientation = useOrientation();

  const { data, isLoading, error } = useSWR(
    `current-location/${JSON.stringify({ coordinates, location })}`,
    async () => {
      if (!coordinates) return null;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await getLocations(
        coordinates.latitude,
        coordinates.longitude
      );
      if (!data) {
        throw new Error("Failed to fetch location data");
      }
      return data;
    },
    {
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (data) setLocation(data);
  }, [data]);

  if (error) {
    setError(error.message);
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ThemedText color="danger">{error.message}</ThemedText>
      </View>
    );
  }

  if (geoError) {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ThemedText style={{ color: colors.danger }}>{geoError}</ThemedText>
      </View>
    );
  }

  if (!coordinates)
    return (
      <View>
        <ThemedText>No coordinates found</ThemedText>
      </View>
    );

  if (location)
    return (
      <View
        style={{
          alignItems: "center",
          gap: 4,
        }}
      >
        <ThemedText color="info" fontSize={20}>
          {location?.city}
        </ThemedText>
        <View
          style={{
            alignItems: "center",
            flexDirection: orientation === "portrait" ? "row" : "column",
            gap: 4,
          }}
        >
          <ThemedText fontSize={18}>{location?.region}</ThemedText>
          {orientation === "portrait" && (
            <ThemedText fontSize={18}>,</ThemedText>
          )}
          <ThemedText fontSize={18}>{location?.country}</ThemedText>
        </View>
      </View>
    );

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
  if (!data) {
    return (
      <View>
        <ThemedText
          style={{
            color: colors.danger,
          }}
        >
          No location found
        </ThemedText>
      </View>
    );
  }
}
