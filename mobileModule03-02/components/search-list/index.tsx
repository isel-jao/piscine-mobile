import axios from "axios";
import { useDebounce } from "../hooks/use-debounce";
import { useGlobalStore } from "../../utils/store";
import { useCallback } from "react";
import { FlatList, TouchableOpacity, Keyboard } from "react-native";
import { colors, headerHeight } from "../../utils/constants";
import useSWR from "swr";
import { BlurView } from "expo-blur";
import ThemedText from "../themed-text";
import { AntDesign } from "@expo/vector-icons";

export function SearchList() {
  const { search, setSearch, setIsSearching, setCoordinates, setLocation } =
    useGlobalStore();
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useSWR(
    `cities/${debouncedSearch}`,
    async () => {
      if (debouncedSearch.length <= 2) {
        return [];
      }
      // try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search`,
        { params: { name: debouncedSearch, count: 5 } }
      );
      return data.data.results;
      // } catch (error) {
      //   throw new Error("An error occurred while fetching data");
      // }
    }
  );

  const Comp = useCallback(() => {
    if (error)
      return (
        <ThemedText color="danger">
          An error occurred while fetching data
        </ThemedText>
      );
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
                borderBottomColor: "#ffffff17",
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
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 10,
          top: 16,
          right: 16,
        }}
        onPress={() => {
          Keyboard.dismiss();
          setTimeout(() => setIsSearching(false), 200);
        }}
      >
        <AntDesign name="close" size={20} color="#7f7f7f" />
      </TouchableOpacity>
      <Comp />
    </BlurView>
  );
}
