import axios from "axios";
import { useDebounce } from "../../hooks/use-debounde";
import { useStore } from "../../utils/store";
import { useCallback } from "react";
import { FlatList, TouchableOpacity, Keyboard } from "react-native";
import { colors, headerHeight } from "../../constants";
import useSWR from "swr";
import { BlurView } from "expo-blur";
import ThemedText from "../themed-text";

export function SearchList() {
  const { search, setSearch, setIsSearching, setCoordinates, setLocation } =
    useStore();
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useSWR(
    `cities/${debouncedSearch}`,
    async () => {
      if (debouncedSearch.length <= 2) {
        return [];
      }
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedSearch}`
        );
        // if (!data.data.results) throw new Error("no results found");
        // console.log("data fetched");
        return data.data.results;
      } catch (error) {
        throw new Error("An error occurred while fetching data");
      }
    }
  );

  const Comp = useCallback(() => {
    if (error) return <ThemedText>{error.message}</ThemedText>;
    if (isLoading) return <ThemedText>Loading...</ThemedText>;
    if (search.length <= 2)
      return <ThemedText>Enter at least 3 characters</ThemedText>;
    if (!data)
      return (
        <ThemedText
          style={{
            color: colors.danger,
          }}
        >
          No results found
        </ThemedText>
      );
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        data={data}
        renderItem={({
          item,
        }: {
          item: {
            id: string;
            name: string;
            latitude: number;
            longitude: number;
            country: string;
            admin1: string;
          };
        }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log("item", item);
                setSearch(item?.name);
                setCoordinates({
                  latitude: item?.latitude,
                  longitude: item?.longitude,
                });
                setLocation(null);
                Keyboard.dismiss();
                setTimeout(() => setIsSearching(false), 200);
              }}
              style={{
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0",
              }}
            >
              <ThemedText
                style={{ display: "flex", flexDirection: "row", gap: 6 }}
              >
                <ThemedText style={{ fontWeight: "bold" }}>
                  {debouncedSearch}
                </ThemedText>
                <ThemedText>{item?.name.split(debouncedSearch)[1]}</ThemedText>
                <ThemedText> , </ThemedText>
                <ThemedText>{item?.admin1}</ThemedText>
                <ThemedText> , </ThemedText>
                <ThemedText>{item?.country}</ThemedText>
              </ThemedText>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
    );
  }, [data, isLoading, error, search]);

  return (
    <BlurView
      tint="dark"
      experimentalBlurMethod="dimezisBlurView"
      intensity={10}
      style={{
        position: "absolute",
        top: headerHeight,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
      }}
    >
      <Comp />
    </BlurView>
  );
}
