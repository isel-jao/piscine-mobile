import { Keyboard, TextInput, TouchableOpacity, Text } from "react-native";
import { colors, headerHeight } from "../../constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useStore } from "../../utils/store";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";

export function Header() {
  const {
    search,
    setSearch,
    setIsSearching,
    setCoordinates,
    setLocation,
    setError,
  } = useStore();
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      tint="dark"
      intensity={25}
      style={{
        height: headerHeight,
        padding: 12,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 12,
      }}
    >
      <StatusBar style="light" />
      <TextInput
        value={search}
        onChangeText={setSearch}
        onFocus={() => setIsSearching(true)}
        style={{
          padding: 8,
          backgroundColor: "transparent",
          borderRadius: 8,
          color: "white",
          flex: 1,
        }}
        placeholder="Search for location..."
        placeholderTextColor={"#7f7f7f"}
      />
      <TouchableOpacity
        style={{
          width: 40,
          aspectRatio: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={0.5}
        onPress={async () => {
          try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              setLocation(null);
              setCoordinates(null);
              setError("Permission to access location was denied");
              return;
            }
            const { coords } = await Location.getCurrentPositionAsync({});
            setCoordinates(coords);
            setLocation(null);
            setSearch("");
            setIsSearching(false);
            Keyboard.dismiss();
          } catch (error) {
            setError(
              "Geolocation is not available, please it in your App settings"
            );
          }
        }}
      >
        <FontAwesome5 name="search-location" size={20} color={colors.primary} />
      </TouchableOpacity>
    </BlurView>
  );
}
